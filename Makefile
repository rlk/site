# Convert all Markdown to HTML

# Some Markdown files represent individual items on summary pages, while others
# represent stand-alone pages. To distinguish these two cases, summary pages are
# processed first. Timestamps then indicate which of the Markdown files remain
# to be processed.

# Find all Markdown files and generate the HTML target name for each.

MD   = $(shell find -L . -name '*.md')
HTML = $(MD:.md=.html)

# Process all catalog pages followed by all stand-alone pages.

all : pages html

pages :
	make -fetc/Makefile PAGE=index
	make -fetc/Makefile PAGE=courses
	make -fetc/Makefile PAGE=research
	make -fetc/Makefile PAGE=applications
	make -fetc/Makefile PAGE=articles
	make -fetc/Makefile PAGE=code
	make -fetc/Makefile PAGE=events
	make -fetc/Makefile PAGE=misc

html : $(HTML)

# Convert a stand-alone Markdown file to HTML using an m4 template.

%.html : %.md
	echo $^
	m4 -DSRC=$< -DDIR=$(dir $<) etc/html.m4 > $@

# Remove all generated files.

clean :
	rm -f $(HTML) index.html courses.html research.html applications.html articles.html code.html events.html misc.html
