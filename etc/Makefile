
MD=$(wildcard $(PAGE)/*.md)

# Macro-expand an HTML page template

$(PAGE).html : $(MD:%.md=%.html) etc/page.m4
	m4 -DPAGE=$(PAGE) etc/page.m4 > $@

# Macro-expand an HTML item template

%.html : %.md etc/item.m4
	m4 -DITEM=$(basename $@) etc/item.m4 > $@
