	
  <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
	<script>
		function random_color(){
			var r = parseInt(Math.random()*257).toString(16);
			var g= parseInt(Math.random()*257).toString(16);
			var b = parseInt(Math.random()*257).toString(16);
			return "#"+r+g+b;
		}
		function getRandom(min,max){
		    return Math.floor(Math.random()*(max-min+1)+min);
		}

		$(function(){
			var arrPre = $("pre").toArray();
			var arrDiv = $("div").toArray();
			var t;

			$(arrDiv).each(function(){
				$(this).css("color",random_color());
			});

			setTimeout(function(){
				
				clearInterval(t);
				t = setInterval(function(){
					$(arrPre).each(function(){
						$(this).css({
							"top": getRandom(0,600),
							"left": getRandom(0,1000),
						});
					});

					$(arrDiv).each(function(){
						$(this).css("color",random_color());
					});
					$("pre").css("position","fixed");
				},600);				
			},3000);
		});
	</script>
