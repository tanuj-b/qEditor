<?php
/*script to generate thumbnails for video*/

function generateThumbs($quizid)
{
	$questionIds = getQuestionIds($quizid);
	$quizTitle = getQuizTitle($quizid);
	$facultyName = getFacultyName($quizid);
	
	$document = "";
	foreach ($questionIds as $key => $qid) {
		writeTemplate($qid,($key+1),$quizTitle,$facultyName);	
		$document .= "./makepng.sh ".$qid."\n";
	}

	writeScript($document);
	
}
function getQuestionIds($quizid)
{
        $query = array(
            "id"=>$quizid,
            "SQL"=>"SELECT questionIds FROM quizzes WHERE id=:id ");
        return explode("|:",doSQL($query, true)->questionIds);
}
function getQuizTitle($quizid)
{
	$query = array(
            "id"=>$quizid,
            "SQL"=>"SELECT descriptionShort as d FROM quizzes WHERE id=:id ");
        return doSQL($query, true)->d;
}

function getFacultyName($quizid)
{
	$fid = doSQL(array(
		"id"=>$quizid,
        "SQL"=>"SELECT facultyId FROM quizzes WHERE id=:id "
		),true)->facultyId;

	$fac = doSQL(array(
		"id"=>$fid,
        "SQL"=>"SELECT firstName, lastName FROM accounts WHERE id=:id "
		),true);

	return $fac->firstName . " " . $fac->lastName;
}

function writeTemplate($qid, $qno, $title, $name)
{
$document = 
'\documentclass{beamer}
\usepackage{graphicx}
\begin{document}
\begin{center}
\ \\\\ \ \\\\
\includegraphics[width=30mm]{Logo-final.png} \\\\
\ \\\\ \ \\\\ 
{\huge Question '.$qno.' \\\\ \ \\\\ }
{\Large
'.$title.'
}
{\large \ \\\\ \ \\\\ Prof. '.$name.' }
\end{center}
\end{document}';

$filename = './output/q' .$qid. 'thumb.tex';

$fp = fopen($filename, 'w') or exit("Unable to write to file");
fwrite($fp,$document);

}
function writeScript($doc)
{
	$fp = fopen('makequiz.sh', 'w') or exit("Unable to write to file");
	fwrite($fp,$doc);
}