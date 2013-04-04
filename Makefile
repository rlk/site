
# This Makefile finds all Markdown files and converts them to HTML.

MD=  $(shell find . -name '*.md' -not -path './input/*')
HTML=$(MD:.md=.html)

html : $(HTML)

clean :
	rm -f $(HTML)

%.html : %.md
	echo "<html><head>"     >  $@
	echo "<link rel=stylesheet type="text/css" href="http://kooima.net/style.css">" >> $@
	echo "</head><body>"   >> $@
	./Markdown.pl $^       >> $@
	echo "</body></html>"  >> $@
