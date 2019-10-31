// https://observablehq.com/@thaynnara007/lab02-part1@38
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`
# Algumas visualizações interativas
`
)});
  main.variable(observer("embed")).define("embed", ["require"], function(require){return(
require("vega-embed@5")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
  # Playlist's danceability around the years
Nessa primeira visualização podemos comparar a média de danceability das playlists em um ano específico, como também podemos filtrar, a partir do click, a média de danceability de uma playlist ao decorrer dos anos de lançamento das músicas que a compõe.
`
)});
  main.variable(observer()).define(["embed"], function(embed){return(
embed({
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {
    "url": "https://raw.githubusercontent.com/cienciadedados-ufcg/vis-cancoes/master/data/playlists-spotify.csv",
    "format":{
      "type": "csv",
      "property": "volumes",
      "parse": {
        "track_album_release_date": "utc:'%Y-%m-%d'"
      }
    }
  },
  "transform":[
    {
    "filter":{
        "selection": "sel_playlist"
        }
      }
    ],
  "width": 800,
  "height": 300,
  "mark": {
    "type": "area"
  },
  "selection":{
    "sel_playlist": {
      "type": "single", 
      "fields": ["playlist_name"], 
      "empty": "all"}
  },
  "encoding": {
    "x": {
      "field": "track_album_release_date",
      "type": "ordinal",
      "timeUnit": "year",
      "axis": {"title": "Album release date"}
    },
    "y":{
      "field": "danceability",
      "aggregate": "mean",
      "type": "quantitative"
    },
    "color":{
      "field": "playlist_name"
    }
  }
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
# Playlist's track's popularity around the years
Aqui podemos observar a distribuição das músicas de cada playlist em relação ao seu ano de lançamento e popularidade, como também podemos observar cada playlist individualmente, ao clicar na barra que representa a quantidade de musicas da playlist em específico, na segunda visualização. Além disso, podemos selecionar um intervalo, usando brush, na primeira visualização, filtrando a quantidade de músicas das playlist daquele intervalo, na segunda visualização.
Podemos notar que as músicas populares estão, geralmente, distribuidas em relação aos anos mais recentes.
`
)});
  main.variable(observer()).define(["embed"], function(embed){return(
embed({
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {
    "url": "https://raw.githubusercontent.com/cienciadedados-ufcg/vis-cancoes/master/data/playlists-spotify.csv",
    "format":{
      "type": "csv",
      "property": "volumes",
      "parse": {
        "track_album_release_date": "utc:'%Y-%m-%d'"
      }
    }
  },
  "vconcat": [
    {
      "encoding":{
        "color":{
          "condition":{
            "title": "Playlists",
            "field": "playlist_name",
            "selection": "brush",
            "type" : "nominal"
          },
          "value": "lightgray"
        },
        "size": {
          "legend":{
            "title": "Energy",
            "clipHeight": 30
          },
          "field": "energy",
          "type": "quantitative"
        },
        "x":{
          "axis": {
            "title": "Album release date"
          },
          "field": "track_album_release_date",
          "timeUnit": "year",
          "type":"temporal"
        },
        "y":{
          "axis": {"title": "Track's popularity"},
          "field": "track_popularity",
          "type": "quantitative"
        }
      },
      "width": 600,
      "height": 400,
      "mark": {
        "type": "point",
        "opacity": 0.7
      },
      "selection": {
        "brush":{
          "encodings": ["x"],
          "type":"interval"
        }
      },
      "transform":[
        {
          "filter":{
            "selection": "click"
          }
        }
      ]
    },
    {
      "encoding":{
        "color":{
          "condition":{
            "field": "playlist_name",
            "selection": "click",
            "type": "nominal"
        },
        "value": "lightgray"
      },
      "x": {
        "aggregate": "count",
        "type": "quantitative"
      },
      "y": {
        "title": "Playlists tracks",
        "field": "playlist_name",
        "type": "nominal"
        }
      },
      "width": 700,
      "height": 200,
      "mark": "bar",
      "selection": {
        "click": {
          "encodings":["color"],
          "type": "multi"
        }
      },
      "transform": [
        {
          "filter": {
            "selection": "brush"
          }
        }
      ]
    }
  ]
})
)});
  return main;
}
