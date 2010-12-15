jQuery(document).ready(function(a){window.listTable={init:function(){this.loading=false;a("form").each(function(){this.reset()});if(""==a.query.GET("paged")){a.query.SET("paged",1)}this.set_total_pages();this.$tbody=a("#the-list, #the-comment-list");this.$overlay=a('<div id="loading-items">').html(listTableL10n.loading).hide().prependTo(a("body"))},set_total_pages:function(e){var d=a(".last-page").attr("href");if(d){this.total_pages=e||a.query.load(d).get("paged")}},get_total_pages:function(){return this.total_pages},htmlencode:function(d){return a("<div/>").text(d).html()},update_rows:function(e,d,h){if(this.loading){return false}var g=false,f={};a.each(e,function(i,j){if(j!=a.query.GET(i)){a.query.SET(i,j);g=true}});if(!g){return false}this.show_overlay();if(d){a.query.SET("paged",1)}a.each(a.query.get(),function(i,j){if(true===j){f[i]=""}else{f[i]=j}});this._callback=h;this.fetch_list(f,a.proxy(this,"handle_success"),a.proxy(this,"handle_error"));return true},fetch_list:function(e,f,d){e=a.extend(e,{action:"fetch-list",list_args:list_args});a.ajax({url:ajaxurl,global:false,dataType:"json",data:e,success:f,error:d})},handle_success:function(d){if("object"!=typeof d){this.handle_error()}else{this.hide_overlay();this.$tbody.html(d.rows);a(".displaying-num").html(d.total_items_i18n);a(".total-pages").html(d.total_pages_i18n);this.set_total_pages(d.total_pages);a(".current-page").val(a.query.GET("paged"));a("th.column-cb :input").attr("checked",false);if(history.replaceState){history.replaceState({},"",location.pathname+a.query)}if(this._callback){this._callback()}}},handle_error:function(){this.hide_overlay();a("h2").after('<div class="error ajax below-h2"><p>'+listTableL10n.error+"</p></div>")},show_overlay:function(){this.loading=true;a(".error.ajax").remove();this.$overlay.css({width:this.$tbody.width()+"px",height:this.$tbody.height()-20+"px"}).css(this.$tbody.offset()).show()},hide_overlay:function(){this.loading=false;this.$overlay.hide()}};listTable.init();function b(e,d){if(e<1){e=1}if(e>listTable.get_total_pages()){e=listTable.get_total_pages()}listTable.update_rows({paged:e},false,function(){if(d.parents(".tablenav.bottom").length){scrollTo(0,0)}a(listTable).trigger("changePage")})}a(".tablenav-pages a").click(function(){var e=a(this),d=a.query.GET("paged");switch(e.attr("class")){case"first-page":d=1;break;case"prev-page":d-=1;break;case"next-page":d+=1;break;case"last-page":d=listTable.get_total_pages();break}b(d,e);return false});a(".current-page").keypress(function(f){if(13!=f.keyCode){return}var d=a(this);b(parseInt(d.val())||1,d);return false});a("th.sortable a, th.sorted a").click(function(){function i(k){return a.query.load(k.find("a").attr("href")).get("order")}var f=a(this),h=f.parent("th"),g=h.index(),j=a.query.load(f.attr("href")).get("orderby"),e;h=h.closest("table").find("thead th:eq("+g+"), tfoot th:eq("+g+")");if(j==a.query.get("orderby")){e=("asc"==a.query.get("order"))?"desc":"asc"}else{e=i(h);var d=a("th.sorted");if(d.length){d.removeClass("sorted").addClass("sortable");d.removeClass("desc").removeClass("asc").addClass("asc"==i(d)?"desc":"asc")}h.removeClass("sortable").addClass("sorted")}h.removeClass("desc").removeClass("asc").addClass(e);listTable.update_rows({orderby:j,order:e},true);return false});function c(d){if("keypress"==d.type&&13!=d.keyCode){return}d.preventDefault();d.stopImmediatePropagation();var e=a(this).parent(".search-box").find(":input").serializeObject();listTable.update_rows(e,true,function(){if(a("h2.nav-tab-wrapper").length){return}if("site-users-network"==pagenow||"site-themes-network"==pagenow){a("h4.search-text").remove();if(e.s){a("ul.subsubsub").after(a('<h4 class="clear search-text">').html(listTableL10n.search.replace("%s",this.htmlencode(e.s))))}}else{a("h2 .subtitle").remove();if(e.s){a("h2").append(a('<span class="subtitle">').html(listTableL10n.search.replace("%s",this.htmlencode(e.s))))}}})}a(".search-box :submit").click(c);a(".search-box :text").keypress(c);a("#post-query-submit").click(function(){var d={};a(this).parents(".actions").find('select[name!="action"]').each(function(){var e=a(this);d[e.attr("name")]=e.val()});listTable.update_rows(d,true);return false});a(".view-switch a").click(function(){var d=a(this);listTable.update_rows({mode:a.query.load(d.attr("href")).get("mode")},false,function(){a(".view-switch .current").removeClass("current");d.addClass("current")});return false})});