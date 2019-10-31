// https://observablehq.com/@thaynnara007/visualizacao-sobre-algumas-playlist-do-spotify@75
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Visualização sobre algumas playlist do Spotify
## Lab01 - part2
`
)});
  main.variable(observer("embed")).define("embed", ["require"], function(require){return(
require("vega-embed@5")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`A visualização a baixo mostra em média, por playlist, o quão adequada suas músicas são para dançar.
 (visualização escolhida para o próximo lab)`
)});
  main.variable(observer("viewof view")).define("viewof view", ["embed"], function(embed){return(
embed(
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {
    "url": "https://raw.githubusercontent.com/cienciadedados-ufcg/vis-cancoes/master/data/playlists-spotify.csv"
  },
  "width": 300,
  "height": 200,
  "mark":"bar",
  "encoding":{
    "y":{
      "field": "danceability",
      "aggregate":"mean",
      "type": "quantitative"
    },
    "x":{
      "field": "playlist_name",
      "type": "nominal"
    }
  }
}
)
)});
  main.variable(observer("view")).define("view", ["Generators", "viewof view"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`A visualização a baixo mostra, em média, o quão popular é cada playlist. 
(visualização escolhida para o próximo lab)`
)});
  main.variable(observer("viewof view2")).define("viewof view2", ["embed"], function(embed){return(
embed(

{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {
    "url": "https://raw.githubusercontent.com/cienciadedados-ufcg/vis-cancoes/master/data/playlists-spotify.csv"
  },
  "width": 300,
  "height": 200,
  "mark":"bar",
  "encoding":{
    "y":{
      "field": "track_popularity",
      "aggregate":"mean",
      "type": "quantitative"
    },
    "x":{
      "field": "playlist_name",
      "type": "nominal"
    }
  }
}
)
)});
  main.variable(observer("view2")).define("view2", ["Generators", "viewof view2"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`A visualização a baixo mostra o tempo de duração, em ms, de cada playlist`
)});
  main.variable(observer("viewof view7")).define("viewof view7", ["embed"], function(embed){return(
embed(
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {
    "url": "https://raw.githubusercontent.com/cienciadedados-ufcg/vis-cancoes/master/data/playlists-spotify.csv"
  },
  "width": 300,
  "height": 300,
  "mark":"bar",
  "encoding":{
    "y": {
      "aggregate":"sum", 
      "field": "track_duration_ms",         
      "type": "quantitative",
      "axis": { "title" :"playlist duration"}
    },
    "x": {
      "field": "playlist_name", 
      "type": "nominal",
      "axis": { "title" :"playlist name"}
    }
  }
}
)
)});
  main.variable(observer("view7")).define("view7", ["Generators", "viewof view7"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`A visualização tenta mostrar uma relação entre o quão boa é a música para dançar, e a falta de vocais na mesma, tornando possivel ver que, geralmente, quanto menos vocal, mais a música é caracterizada como boa para dançar. `
)});
  main.variable(observer("viewof view3")).define("viewof view3", ["embed"], function(embed){return(
embed(
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {
    "url": "https://raw.githubusercontent.com/cienciadedados-ufcg/vis-cancoes/master/data/playlists-spotify.csv"
  },
  "width": 500,
  "height": 300,
  "mark":"point",
  "encoding":{
    "y":{
      "field": "danceability",
      "type": "quantitative"
    },
    "x":{
      "field": "speechiness",
      "type": "quantitative"
    }
  }
}
)
)});
  main.variable(observer("view3")).define("view3", ["Generators", "viewof view3"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`A visualização tenta mostrar uma relação entre o quão boa é a música para dançar, e o quão ela é caracterizada como alegre, tornando possivel ver que, geralmente, quanto mais alegre , mais a música é caracterizada como boa para dançar. (visualização escolhida para o próximo lab) `
)});
  main.variable(observer("viewof view4")).define("viewof view4", ["embed"], function(embed){return(
embed(
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {
    "url": "https://raw.githubusercontent.com/cienciadedados-ufcg/vis-cancoes/master/data/playlists-spotify.csv"
  },
  "width": 500,
  "height": 300,
  "mark":"point",
  "encoding":{
    "y":{
      "field": "danceability",
      "type": "quantitative"
    },
    "x":{
      "field": "valence",
      "type": "quantitative"
    }
  }
}
)
)});
  main.variable(observer("view4")).define("view4", ["Generators", "viewof view4"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`A visualização tenta mostrar uma relação entre a popularidade das músicas e o fator destas serem ou não explícitas.`
)});
  main.variable(observer("viewof view5")).define("viewof view5", ["embed"], function(embed){return(
embed(
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": { "url": "https://raw.githubusercontent.com/cienciadedados-ufcg/vis-cancoes/master/data/playlists-spotify.csv"},
  "transform": [
    {
    "calculate": "datum.track_explicit == 'TRUE' ? 'Explicit' : 'Not explicit'", 
    "as": "explicit"
    },
    {
      "calculate": "datum.track_explicit == 'TRUE' ? -datum.track_popularity : datum.track_popularity", 
      "as": "signed_popularity"
      }
  ],
  "width": 500,
  "height": 300,
  "mark": "bar",
  "encoding": {
    "y": {
      "field": "track_duration_ms", "type": "ordinal",
      "axis": null, "sort": "descending"
    },
    "x": {
      "aggregate": "sum", "field": "signed_popularity", "type": "quantitative",
      "axis": {"title": "popularity", "format": "s"}
    },
    "color": {
      "field": "explicit", "type": "nominal",
      "scale": {"range": ["#f369b1", "#9a79f9"]},
      "legend": {"orient": "top", "title": null}
    }
  },
  "config": {
    "view": {"stroke": null},
    "axis": {"grid": false}
  }
}

)
)});
  main.variable(observer("view5")).define("view5", ["Generators", "viewof view5"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`A visualização mostra a quantidade de músicas explicitas e não explicitas em cada playlist. (visualização escolhida para o próximo lab)`
)});
  main.variable(observer("viewof view6")).define("viewof view6", ["embed"], function(embed){return(
embed(
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": { "url": "https://raw.githubusercontent.com/cienciadedados-ufcg/vis-cancoes/master/data/playlists-spotify.csv"},
  "width": 500,
  "height": 300,
  "mark": "bar",
  "encoding": {
    "y": {
      "aggregate":"count", 
      "field": "track_name",         
      "type": "quantitative",
      "axis": { "title" :"Amount of tracks"}
    },
    "x": {
      "field": "playlist_name", 
      "type": "nominal"
    },
    "color":{
      "field": "track_explicit",
      "type": "nominal",
      "legend": {"title": "Explicit"}
    }
  }
}
)
)});
  main.variable(observer("view6")).define("view6", ["Generators", "viewof view6"], (G, _) => G.input(_));
  return main;
}
