// https://observablehq.com/@thaynnara007/spotify-algumas-visualizacoes-sobre-algumas-de-suas-playl@64
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Spotify - O que torna algumas de suas playlists populares
## Lab01 - part 03

Com as visualizações aqui apresentadas, tentei encontrar algumas variáveis que possam explicar a popularidade de algumas playlists.
`
)});
  main.variable(observer("embed")).define("embed", ["require"], function(require){return(
require("vega-embed@5")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Visualização 01
Aqui é mostrado a popularidade cada playlist com base na média da popularidade das músicas que as compõe. Sendo assim, temos as 3 playlist mais populares como sendo: Pop Up, Pop Brasil e Esquenta sertanejo.
`
)});
  main.variable(observer("viewof view2")).define("viewof view2", ["embed"], function(embed){return(
embed(
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "width": 400,
  "height": 200,
  "data": {
      "url": "https://raw.githubusercontent.com/cienciadedados-ufcg/vis-cancoes/master/data/playlists-spotify.csv"
  },
  "mark": "bar",
  "encoding": {
      "x": {
          "field": "playlist_name",
          "type": "nominal",
          "axis": {
            "title": null
          },
          "sort":{
            "op": "mean",
            "field": "track_popularity"
          }
      },
      "y": {
          "field": "track_popularity",
          "aggregate": "mean",
          "type": "quantitative",
          "axis": {
              "title": "Popularity mean"
          }
      },
          "color": {
          "field": "playlist_name",
          "type": "nominal"
      }
  }
})
)});
  main.variable(observer("view2")).define("view2", ["Generators", "viewof view2"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`
### Visualização 02
Aqui é mostrado a distribuição das músicas de cada playlist em relação a seu ano de lançamento e popularidade, logo mais, é possível observar que as playlists mais populares, definidas na visualização anterior, são compostas por músicas mais atuais.
`
)});
  main.variable(observer("viewof view1")).define("viewof view1", ["embed"], function(embed){return(
embed(
{
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
  "width": 650,
  "height": 400,
  "mark": {
    "type": "circle",
    "opacity": 0.7,
    "stroke": "black",
    "strokeWidth": 1.3
  },
  "encoding": {
    "x": {
      "field": "track_album_release_date",
      "type": "temporal",
      "axis": {
        "labelAngle": 0,
        "title": "Album release year"
      }
    },
    "y": {
      "field": "playlist_name", 
      "type": "nominal", 
      "axis": {
        "title": ""
      }
    },
    "size": {
      "field": "track_popularity",
      "type": "quantitative",
      "legend": {
        "title": "Track popularity", 
        "clipHeight": 30
      },
      "scale": {
        "range": [0, 2500]
      }
    },
    "color": {
      "field": "playlist_name", 
      "type": "nominal", 
      "legend": null
    }
  }
}
)
)});
  main.variable(observer("view1")).define("view1", ["Generators", "viewof view1"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`
### Visualização 03
Aqui é mostrado a distribuição de 3 variáveis: danceability, energy e speechiness de cada playlist em relação aos anos de lançamento de suas músicas. Por tanto, notamos aqui que as três variáveis, para as nossas 3 playlists mais populares, variam entre sí em até 20%, ou seja, para as playlists populares, os valores de danceability, energy e speechiness são semelhantes.
`
)});
  main.variable(observer("viewof view3")).define("viewof view3", ["embed"], function(embed){return(
embed(
{
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
  "repeat": {
    "column": ["danceability", "energy", "speechiness"]
    },
  "spec": {
    "layer": [
      {
        "width": 450,
        "height": 200,
        "mark": "line",
        "encoding": {
          "y": {
            "aggregate": "mean",
            "field": {
              "repeat": "column"
            },
            "type": "quantitative"
          },
          "x": {
            "timeUnit": "year",
            "field": "track_album_release_date",
            "type": "ordinal"
          },
          "detail": {
            "timeUnit": "year",
            "type": "temporal",
            "field": "track_album_release_date"
          }
        }
      },
      {
        "mark": "line",
        "encoding": {
          "y": {
            "aggregate": "mean",
            "field": {
              "repeat": "column"
            },
            "type": "quantitative"
          },
          "x": {
            "timeUnit": "year",
            "field": "track_album_release_date",
            "type": "ordinal",
            "axis": {
              "title": "Album release year"
            }
          },
          "color": {
            "type": "nominal", "field": "playlist_name"
          }
        }
      }
    ]
  }
})
)});
  main.variable(observer("view3")).define("view3", ["Generators", "viewof view3"], (G, _) => G.input(_));
  return main;
}
