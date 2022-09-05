// import React from "react";
// import ReactMde from "react-mde";
// import Showdown from "showdown";
// import "react-mde/lib/styles/css/react-mde-all.css";

// function Editor({currentNote , updateNote}){

//     const [ selectedTab , setSelectedTab] = React.useState("write")
//     const converter = new Showdown.Converter({
//         tables:true,
//         simplifiedAutoLink:true,
//         strikethrough:true,
//         tasklists:true,
//     })
   
  
//     return (
//          <section className="pane-editor"> 
//             <ReactMde
//                value={currentNote.body}
//                onChange={updateNote}
//                selectedTab={selectedTab}
//                onTabChange={setSelectedTab}
//                generateMarkdownPreview={(markdown) => 
//                    Promise.resolve(converter.makeHtml(markdown))
//                }
//                minEditorHeight={80}
//                heightUnits="vh" 
               
//                />
//          </section>
//     )
// }

// export default Editor;


import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

function loadSuggestions(text) {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: "Andre",
          value: "@andre"
        },
        {
          preview: "Angela",
          value: "@angela"
        },
        {
          preview: "David",
          value: "@david"
        },
        {
          preview: "Louise",
          value: "@louise"
        }
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

 function Editor() {
   
  const [value, setValue] = React.useState("**Write your notes here**");
  const [selectedTab, setSelectedTab] = React.useState("write");


  const save = async function* (data) {
    //Promise that waits for "time" milliseconds
    const wait = function (time) {
      return new Promise((a, r) => {
        setTimeout(() => a(), time);
      });
    };

    //Upload "data" to your server
    //Use XMLHttpRequest.send to send a FormData object containing
    //"data"
    //Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

    await wait(2000);
    //yields the URL that should be inserted in the markdown
    yield "https://picsum.photos/300";
    await wait(2000);

    //returns true meaning that the save was successful
    return true;
  };

  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh" 
        loadSuggestions={loadSuggestions}
        childProps={{
          writeButton: {
            tabIndex: -1
          }
        }}
        paste={{
          saveImage: save
        }}
      />
    </div>
  );
}

export default Editor;