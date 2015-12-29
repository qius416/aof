/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';
  /* globals d3 */
  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {

  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    window.addEventListener('resize',function(){
      var header = document.querySelector('#scrollHeader'),
          condensedHeight = header._config.condensedHeaderHeight;
      if(condensedHeight/document.body.clientHeight>1/3 ){
          Polymer.Base.toggleAttribute('keep-condensed-header',false,header);
      }else{
          Polymer.Base.toggleAttribute('keep-condensed-header',true,header);
      }
    });
    var width = 100,
        height = 100;

    var nodes = [],
        links = [];

    var force = d3.layout.force()
      .nodes(nodes)
      .links(links)
      .size([width, height])
      .friction(0.8)
      .linkDistance(45)
      .on('tick', function(){
        node.attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });
      });

    var svg = d3.select('svg#math');

    var node = svg.selectAll('.node');

    var a = {id: 1,color:'#3c515d',name:'0',textColor:'#c1cfd7',y:5},
        b = {id: 2,color:'#a7c686',name:'e',textColor:'#cddfb9',y:4},
        c = {id: 3,color:'#ff7043',name:'Π',textColor:'#ffb199',y:6};
    nodes.push(a, b, c);
    links.push({source: a, target: b},
               {source: a, target: c},
               {source: b, target: c});
    node = node.data(force.nodes(), function(d) {
      return d.id;
    });

    var g = node.enter().append('svg:g').attr('class', 'node');

    g.append('svg:circle').attr('r', 10).style('fill',function(d){return d.color;});

    g.append('svg:text').attr('class','mathball').text(function(d){return d.name;}).attr('x',0).attr('y',function(d){return d.y;}).attr('text-anchor','middle').style('fill',function(d){return d.textColor;}).style('stroke',function(d){return d.textColor;});

    g.call(force.drag);

    force.start();

    var numbers = d3.range(20).map(function(){return Math.round(Math.random());});
    var work = d3.select('svg#work');
    work.selectAll('.digit').data(numbers)
      .enter()
      .append('text')
      .attr('class',function(d){return 'digit t'+d;})
      .attr('x',function(d,i){return i%5*20 + 4*d + 2;})
      .attr('y',function(d,i){return Math.floor(i/5)*20 + 24;})
      .text(function(d){return d;});
    work.on('click',function(){
      setTimeout(function(){
        numbers = d3.range(20).map(function(){return Math.round(Math.random());});
        work.selectAll('.digit')
            .data(numbers)
            .attr('class',function(d){return 'digit t'+d;})
            .attr('x',function(d,i){return i%5*20 + 4*d + 2;})
            .attr('y',function(d,i){return Math.floor(i/5)*20 + 24;})
            .text(function(d){return d;});
      },100);
      setTimeout(function(){
        numbers = d3.range(20).map(function(){return Math.round(Math.random());});
        work.selectAll('.digit')
            .data(numbers)
            .attr('class',function(d){return 'digit t'+d;})
            .attr('x',function(d,i){return i%5*20 + 4*d + 2;})
            .attr('y',function(d,i){return Math.floor(i/5)*20 + 24;})
            .text(function(d){return d;});
      },200);
      setTimeout(function(){
        numbers = d3.range(20).map(function(){return Math.round(Math.random());});
        work.selectAll('.digit')
            .data(numbers)
            .attr('class',function(d){return 'digit t'+d;})
            .attr('x',function(d,i){return i%5*20 + 4*d + 2;})
            .attr('y',function(d,i){return Math.floor(i/5)*20 + 24;})
            .text(function(d){return d;});
      },400);
    });    
  });

  addEventListener('paper-header-transform', function(e) {
    var middleContainer = document.querySelector('#mainToolbar .middle-container');
    var d = e.detail;
    var m = d.height - d.condensedHeight;
    var scale = Math.max(0.75, (m - d.y) / (m / 0.25)  + 0.75);
    Polymer.Base.transform('scale(' + scale + ') translateZ(0)', middleContainer);
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onDataRouteClick = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    document.getElementById('mainContainer').scrollTop = 0;
  };

})(document);
