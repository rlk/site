# Personal Web Site

## To Build

Generate all indices and convert all Markdown to HTML:

	make

## To Clean

Remove all generated files:

	make clean

## To Validate

To scan for broken links, start the Python web server,

	python -m SimpleHTTPServer

spider it with logging,

	wget --spider -o wget.log -e robots=off -r -p http://localhost:8000

and search the log for 404s.

	grep -B2 404 wget.log | less
