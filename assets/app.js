// Code by CYB3R-G0D
function submit(){
    if( !document.getElementById("pname").value.replace(/\s+/, '').length ) {
        alert( "The Project Name field is empty!" );
        return false;
    }
    if( !document.getElementById("nname").value.replace(/\s+/, '').length ) {
        alert( "The Node Name field is empty!" );
        return false;
    }
    var pname = document.getElementById("pname").value.replace(/ /g,"_");
    var nname = document.getElementById("nname").value.replace(/ /g,"_");
    var ndesc = document.getElementById("ndescription").value;
    var group = document.getElementById("group").value;
    var in1 = document.getElementById("in1").value;
    var in2 = document.getElementById("in2").value;
    var in3 = document.getElementById("in3").value;
    var in4 = document.getElementById("in4").value;
    var in5 = document.getElementById("in5").value;
    var in6 = document.getElementById("in6").value;
    var in7 = document.getElementById("in7").value;
    var in8 = document.getElementById("in8").value;
    var in9 = document.getElementById("in9").value;
    var output  = document.getElementById("output");

    var line1 = `minetest.register_node("${pname}:${nname}", {`
    var line2 = `    description = "${ndesc}",`
    var line3 = `    tiles = {\n        "${pname}_${nname}_top.png",  \n        "${pname}_${nname}_bottom.png",  \n        "${pname}_${nname}_right.png", \n        "${pname}_${nname}_left.png",  \n        "${pname}_${nname}_rear.png",  \n        "${pname}_${nname}_front.png" \n     },`
    var line4 = `    groups = {${group} = 2} \n})`
    var line5 = `\nminetest.register_craft({`
    var line6 = `    output = "${pname}:${nname}",\n    --type = "shapeless",`
    var line7 = `    recipe = {\n         {"${in1}", "${in2}", "${in3}"},`
    var line8 = `        {"${in4}", "${in5}", "${in6}"},`
    var line9 = `        {"${in7}", "${in8}", "${in9}"},\n     } \n})`

    document.getElementById("submit").style.cssText = "animation: none;"
    document.getElementById("output").style.cssText = "border: solid 1px black;";

    output.innerHTML = `${line1} \n ${line2} \n ${line3} \n ${line4} \n ${line5} \n ${line6} \n ${line7} \n ${line8} \n ${line9}`
    
    document.getElementById("dsp1").innerHTML = `<br>Create a folder "${pname}". <br>Inside ${pname} folder create a file "init.lua" <br> Paste the following code in init.lua`
    document.getElementById("dsp2").innerHTML = `Create a folder "textures" inside "${pname}" and add your texture images.`

    var pop = document.getElementById("pop");
    var close = document.getElementsByClassName("close")[0];

    pop.style.display = "block";
    
    close.onclick = function() {
        pop.style.display = "none"
    }
    window.onclick = function(event) {
        if (event.target == pop) {
            pop.style.display = "none";
        }
    }

    var copyBtn = document.getElementById("copy");
    copyBtn.onclick = function() {
        output.select();
        output.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(output.value);
        copyBtn.value = "Copied!"
    }

    var modconf = `name = ${pname}\ndescription = ${ndesc}`

    var downloadBtn = document.getElementById("download");
    downloadBtn.onclick = function(){
        var zip = new JSZip();
        zip.file("init.lua", output.value);
        zip.file("mod.conf", modconf);
        var txt = zip.folder("textures");
        zip.generateAsync({type:"blob"})
        .then(function(content) {
        saveAs(content, `${pname}.zip`);
    });

    }
}