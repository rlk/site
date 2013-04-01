#!/bin/sh

CSS=../../style.css

HTML=`echo $1 | sed -e 's/.md$/.html/'`

echo "<html>"     > $HTML
echo "<head>"    >> $HTML
echo "<link rel=stylesheet type="text/css" href=\"$CSS\">" >> $HTML
echo "</head>"   >> $HTML
echo "<body>"    >> $HTML
./Markdown.pl $1 >> $HTML
echo "</body>"   >> $HTML
echo "</html>"   >> $HTML
