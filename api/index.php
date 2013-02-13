<?php
header("Access-Control-Allow-Origin: *");
// set timezones
date_default_timezone_set('Asia/Calcutta');
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

//include 'helper.php';
//include 'authState.php';

// the L1,L2,L3

//questions
$app->get('/question/:id', 'getQuestion');

// the fac pages
$app->get('/testcode', 'testCode');
$app->get('/question/add', 'addQuestion');
$app->get('/question/:id', 'getQuestion');
$app->post('/copyImages','copyImages');
$app->post('/question/update', 'updateQuestion');

//packages
define('SUCCESS', "success"); // returns the requested data.
define('FAIL', "fail"); // logical error.
define('ERROR', "error"); // system error.
define('EXCEPTION_MSG', "Something went wrong. Please send an email to ..."); // system error.


/**
 * All responses routed through this function
 * @param Object $response
 */
function sendResponse($response) {
    // maintaining a queue/ including any checks
    // Include support for JSONP requests
    if (!isset($_GET['callback'])) {
        echo json_encode($response);
    } else {
        echo $_GET['callback'] . '(' . json_encode($response) . ');';
    }
}

/**
 * Handle server side exceptions and errors. Maintain logs
 * @param $msg
 */
function phpLog($msg) {
    //error_log($msg, 3, '/var/tmp/php.log');
    echo $msg;
}

function updateQuestion()
{
    $response["data"] = doSQL(array(
        "qid" => $_POST["qid"],
        "txt" => $_POST["text"],
        "exp" => $_POST["explanation"],
        "opt" => $_POST["options"],
        "tid" => $_POST["typeId"],
        "cor" => $_POST["correctAnswer"],
        "SQL" => "UPDATE questions SET text = :txt, explanation = :exp, options = :opt, correctAnswer =:cor, typeId = :tid WHERE id = :qid"),false);

    $response["status"] = SUCCESS;
    sendResponse($response);
}

function addQuestion()
{
    $rand = "a" . rand();
    doSQL(array(
        "txt" => $rand,
        "SQL" => "INSERT INTO questions(text) VALUES(:txt);"),false);
     $data = doSql(array(
        "txt" => $rand,
        "SQL" => "SELECT id FROM questions WHERE text=:txt;"
        ),true);
    $response["data"] = $data->id;
    $response["status"] = SUCCESS;
    sendResponse($response);
}

function getQuestion($id)
{
    $data = doSql(array(
        "qid" => $id,
        "SQL" => "SELECT * FROM questions WHERE id=:qid;"
        ),true);

    $response["data"] = $data;
    $response["status"] = SUCCESS;
    sendResponse($response);
}

function copyImages()
{   
    $adjustPath = "../";
    foreach ($_POST["oldSrc"] as $key => $oldSrc)
        shell_exec("cp ".$adjustPath.$oldSrc." ".$adjustPath.$_POST["newSrc"][$key]);

    $response["data"] = true;
    $response["status"] = SUCCESS;
    sendResponse($response);
}

function stream_copy($src, $dest) 
{ 
    $fsrc = fopen($src,'r'); 
    $fdest = fopen($dest,'w+'); 
    $len = stream_copy_to_stream($fsrc,$fdest); 
    fclose($fsrc);
    fclose($fdest);
    return $len; 
} 
/*
function getTopics($level, $id) {
    
    $sql = "SELECT * from section_" . $level . " where streamId=:id";
        $stmt->bindParam("id", $id);
        $records = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $response["status"] = SUCCESS;
        $response["data"] = $records;
}

//
// The dashboard page 
//

function getQuestion($id) {
    $response = array();
    $accountId = $_GET['accountId'];
    $sql = "SELECT q.*,r.optionSelected,r.timeTaken,p.id as paraId, p.text as para from questions q left join para p on (p.id=q.paraId) left join responses r on (q.id=r.questionId) where q.id=:qId and r.accountId=:accountId";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("qId", $id);
        $stmt->bindParam("accountId", $accountId);
        $stmt->execute();
        $record = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        if ($record) {
            $response["status"] = SUCCESS;
            $response["data"] = $record;
        } else {
            $response["status"] = FAIL;
            $response["data"] = "No record found";
        }
    } catch (PDOException $e) {
        $response["status"] = ERROR;
        $response["data"] = EXCEPTION_MSG;
        phpLog($e->getMessage());
    }
    sendResponse($response);
}

function getQuestions($qids) {
    $qids = explode("|:", $qids);
    $sql = "SELECT q.*,p.id as paraId, p.text as para from questions q left join para p on (p.id=q.paraId) where q.id IN("
            . implode(",", $qids) . ")";
    //echo $sql;
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $questions = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        return $questions;
    } catch (PDOException $e) {
        phpLog($e->getMessage());
    }
}
*/
function doSQL($params,$returnsData,$fetchAs = "obj",$callBack = ""){   /*
    $firephp = FirePHP::getInstance(true);
    $firephp->log($params, "SQL:");*/
    $sql = array_pop($params);
   try{
        $db   = getConnection();
        $stmt = $db->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue(":".$key,$value);
        }
        $stmt->execute();
        $db = null;
        if($returnsData === true)
            if($fetchAs === "obj")
                return $stmt->fetch(PDO::FETCH_OBJ);
            elseif($fetchAs === "all_array")
                return $stmt->fetchAll();
            elseif($fetchAS === "all_func")
                return $stmt->fetchAll(PDO::FETCH_FUNC,$callBack);
    }
    catch (PDOException $e) {
        //phpLog("doSqlError:".$sql.$e->getMessage());
        //echo("doSqlError:".$sql.$e->getMessage());
    }
}
include 'xkcd.php';

$app->run();
