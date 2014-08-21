
MD=$(wildcard $(PAGE)/*.md)

HTML=$(MD:%.md=%.html)

# Macro-expand an HTML page template

$(PAGE).html : $(HTML) etc/page.m4
	m4 -DPAGE=$(PAGE) etc/page.m4 > $@

# Macro-expand an HTML item template

%.html : %.md etc/item.m4
	m4 -DITEM=$(basename $@) etc/item.m4 > $@

clean :
	rm $(HTML) $(PAGE).html
