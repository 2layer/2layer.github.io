NODE-WEBKIT=v0.6.2

.PHONY: admin
admin:
	@mkdir -p bin
	@rm -rf bin/2layer-admin.app
	@echo downloading node-webkit engine…
	curl -sSO http://s3.amazonaws.com/node-webkit/${NODE-WEBKIT}/node-webkit-${NODE-WEBKIT}-osx-ia32.zip
	@echo unpacking, renaming and copying files…
	@unzip -qq node-webkit-${NODE-WEBKIT}-osx-ia32.zip
	@rm node-webkit-${NODE-WEBKIT}-osx-ia32.zip nwsnapshot
	@mv node-webkit.app bin/2layer-admin.app
	@mkdir bin/2layer-admin.app/Contents/Resources/app.nw/

# Build admin files
	@grunt bin

# Common files
	@cd bin/2layer-admin.app/Contents/Resources/app.nw/ && ln -s ../../../../../index.html
	@cd bin/2layer-admin.app/Contents/Resources/app.nw/ && ln -s ../../../../../index.css
	@cd bin/2layer-admin.app/Contents/Resources/app.nw/ && ln -s ../../../../../favicon.ico
	@cd bin/2layer-admin.app/Contents/Resources/app.nw/ && ln -s ../../../../../data
	@cd bin/2layer-admin.app/Contents/Resources/app.nw/ && ln -s ../../../../../images
	@cd bin/2layer-admin.app/Contents/Resources/app.nw/ && ln -s ../../../../../css

# Admin page specific files
	@cd bin/2layer-admin.app/Contents/Resources/app.nw/ && ln -s ../../../../../app.nw/index.js
	@cd bin/2layer-admin.app/Contents/Resources/app.nw/ && ln -s ../../../../../app.nw/package.json

	@echo done!
	@echo bin/2layer-admin.app is ready.
