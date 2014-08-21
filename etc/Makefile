
# List all Markdown files in the directory named PAGE.

MD=$(wildcard $(PAGE)/*.md)

# Convert the list of Markdown files to a list of HTML files.

HTML=$(MD:%.md=%.html)

# Macro-expand an HTML page template.

$(PAGE).html : $(HTML) etc/page.m4
	m4 -DPAGE=$(PAGE) etc/page.m4 > $@

# Macro-expand an HTML item template.

%.html : %.md etc/item.m4
	m4 -DBASE=$(basename $<) -DITEM=$(shell etc/itemname $<) etc/item.m4 > $@

# Remove all generated HTML.

clean :
	rm -f $(HTML) $(PAGE).html
