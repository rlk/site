
all :
	make -fetc/Makefile PAGE=index
	make -fetc/Makefile PAGE=courses
	make -fetc/Makefile PAGE=research
	make -fetc/Makefile PAGE=applications
	make -fetc/Makefile PAGE=articles
	make -fetc/Makefile PAGE=code
	make -fetc/Makefile PAGE=events
	make -fetc/Makefile PAGE=misc

clean :
	make -fetc/Makefile PAGE=index clean
	make -fetc/Makefile PAGE=courses clean
	make -fetc/Makefile PAGE=research clean
	make -fetc/Makefile PAGE=applications clean
	make -fetc/Makefile PAGE=articles clean
	make -fetc/Makefile PAGE=code clean
	make -fetc/Makefile PAGE=events clean
	make -fetc/Makefile PAGE=misc clean

# This Makefile finds all Markdown files and converts them to HTML.

# MD=  $(shell find . -name '*.md' -not -path './input/*')
# HTML=$(MD:.md=.html)

# html : $(HTML)

# clean :
# 	rm -f $(HTML)

# %.html : %.md
# 	echo "<html><head>"     >  $@
# 	echo "<link rel=stylesheet type="text/css" href=\"http://kooima.net/style.css\">" >> $@
# 	echo "</head><body>"   >> $@
# 	./Markdown.pl $^       >> $@
# 	echo "</body></html>"  >> $@
