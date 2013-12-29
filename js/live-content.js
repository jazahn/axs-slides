define(['jquery.min'], function(){
	console.log('live-content');
	return {
		refreshLiveCoding: function(e, basename) {
			var src = $('#' + basename + '_src');
			var dst = $('#' + basename + '_embed');
			var html = src.text();
			var scripts = /<script>([^<]*)<\/script>/i.exec(html);
			//console.log('html: '+html);
			//console.log('scripts: ' + scripts);
			if (scripts) {
				var scriptCode = scripts[1];
				html = html.replace(/<script>[^<]*<\/script>/, '');
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.innerText = scriptCode;
				document.body.appendChild(script);
			}
			dst[0].innerHTML = html;
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
			return false;
		},

		// Sync a contenteditable containing html with a div containing the result.
		manageLiveCoding: function(basename) {
			var src = $('#' + basename + '_src');
			var that = this;
			this.refreshLiveCoding(null, basename);
			src.bind('keydown', function(e) {
				if (e.keyCode == 9)	// tab
					return true;
				window.setTimeout(function() {
					that.refreshLiveCoding(null, basename);
				}, 100);
				e.stopPropagation();
				//return false;
			});
			
		}	
	};
	
	
});