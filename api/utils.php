<?php

/**
 * Methods not used anywhere else in the code but executed directly through the urls
 */



/**
 * ensure that the resources are correctly set in questions
 */
function sanitizeQuestions() {
    $sql = "SELECT * FROM questions where id='" . $id . "'";
    echo $sql;
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $questions = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo "\n \n Outputting question text ----====";
        echo json_encode($questions[0]->text);
        echo "\n \n Outputting option text ----====";
        echo json_encode($questions[0]->options);
        echo "\n \n Outputting description text ----====";
        echo json_encode($questions[0]->explanation);
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}


function resetResults() {
    $sql = "TRUNCATE table results  ";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $projects = $stmt->execute();
        $db = null;
        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($projects);
        } else {
            echo $_GET['callback'] . '(' . json_encode($projects) . ');';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

// the resets
$app->get('/resetResults/', 'resetResults');

function resetUsers() {
    $sql = "TRUNCATE table students";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $projects = $stmt->execute();
        $db = null;
        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($projects);
        } else {
            echo $_GET['callback'] . '(' . json_encode($projects) . ');';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

$app->get('/testq/:id', 'testQuestion');

function testQuestion($id) {
    $sql = "SELECT * FROM questions where id='" . $id . "'";
    echo $sql;
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $questions = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo "\n \n Outputting question text ----====";
        echo json_encode($questions[0]->text);
        echo "\n \n Outputting option text ----====";
        echo json_encode($questions[0]->options);
        echo "\n \n Outputting description text ----====";
        echo json_encode($questions[0]->explanation);
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}


$app->get('/email/', 'sendEmail');
$app->get('/emailt/', 'sendEmail2');

function sendEmail() {
    require_once "/home/atestnqy/php/Mail.php";
    require_once "/home/atestnqy/php/Net/Socket.php";
    require_once "/home/atestnqy/php/Net/SMTP.php";
    
    $from = "shikhar@prepsquare.com";
    $to = "shikhar.sachan@gmail.com";
    $subject = "Hi!";
    $body = "test";

    $host = "ssl://smtp.gmail.com";
    $port = "465";
    $username = "shikhar@prepsquare.com"; //<> give errors
    $password = "shikhar1";

    $headers = array('From' => $from, 'To' => $to, 'Subject' => $subject);
    $smtp = Mail::factory('smtp', array('host' => $host, 'port' => $port,
            'auth' => true, 'username' => $username, 'password' => $password));

    $mail = $smtp->send($to, $headers, $body);

    if (PEAR::isError($mail)) {
        echo ("<p>" . $mail->getMessage() . "</p>");
    } else {
        echo ("<p>Message successfully sent!</p>");
    }
}

function sendEmail2(){
    $to = "shikhar.sachan@gmail.com";
    $subject = 'the subject';
    $message = 'hello';
    
    $res = mail($to, $subject, $message);
    echo json_encode($res);
}
