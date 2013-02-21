#!/bin/bash
cd output
cp q$1thumb.tex a.tex
pdflatex -output-directory=png a.tex
cd png
sips -s format png a.pdf --out q$1thumb.png
rm a.*
cd ..
rm a.*
cd ..