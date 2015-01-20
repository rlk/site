# Find all Markdown files and generate the HTML target name for each.

MD   = $(shell find . -name '*.md')
HTML = $(MD:.md=.html)

html : $(HTML)

# Convert a stand-alone Markdown file to HTML using an m4 template.

%.html : %.md style.css
	echo $^
	m4 -DSRC=$< html.m4 > $@

# Remove all generated files.

clean :
	rm -f $(HTML)
