//Ocultar elementos de configuración
window.addEventListener("load", function(event) {
    let c = resourceIdentification();
    
    if (c.length>0){
        if (c[2]=="hvp"){
            document.getElementById("id_showdescription").style.display = "none";
            document.getElementById("id_displayoptions").style.display = "none";
            document.getElementById("id_modstandardgrade").style.display = "none";
            document.getElementById("id_modstandardelshdr").style.display = "none";
            document.getElementById("id_availabilityconditionsheader").style.display = "none";
            document.getElementById("id_activitycompletionheader").style.display = "none";
            document.getElementById("id_competenciessection").style.display = "none";
        }
        else if (c[2]=="page"){
            document.getElementById("id_showdescription").style.display = "none";
            document.getElementById("id_appearancehdr").style.display = "none";
            document.getElementById("id_modstandardelshdr").style.display = "none";
            document.getElementById("id_availabilityconditionsheader").style.display = "none";
            document.getElementById("id_activitycompletionheader").style.display = "none";
            document.getElementById("id_competenciessection").style.display = "none";
            document.getElementById("fitem_id_introeditor").style.display = "none";
        }
        else if (c[2]=="folder"){
            document.getElementById("id_showdescription").style.display = "none";
            document.getElementById("id_display").style.display = "none";
            document.getElementById("id_showexpanded").style.display = "none";
            document.getElementById("id_showdownloadfolder").style.display = "none";
            document.getElementById("id_forcedownload").style.display = "none";
            document.getElementById("id_modstandardelshdr").style.display = "none";
            document.getElementById("id_availabilityconditionsheader").style.display = "none";
            document.getElementById("id_activitycompletionheader").style.display = "none";
            document.getElementById("id_competenciessection").style.display = "none";
        }
    }   
});

//identificar tipo de elemento
function resourceIdentification(){
    let currentURL = window.location.href;
    
    // Se valida que se este en modo edición en algún recurso de moodle
    if (currentURL.indexOf("modedit.php")>0){
        // Se hacen visibles los elementos para configurar
        document.getElementById("resourceSelect").style.display = "block";
        document.getElementById("resourceConfig").style.display = "flex";
        // Se identifica el tipo de elemento y se ubica el select en ese elemento.
        let a = document.getElementById("region-main")
        let b = a.childNodes[2].childNodes[1].childNodes[0].src
        let c = b.slice(b.indexOf("image.php"), b.length).split("/")
        switch (c[2]){
            case "hvp":
                setConfig.select("resourceSelect","1");
                break;
            case "folder":
                setConfig.select("resourceSelect","2");
                break;
            case "page":
                setConfig.select("resourceSelect","3");
                break;
            default:
                break;
        }
        return c
    }
    else{
        document.getElementById("resourceSelect").style.display = "none";
        document.getElementById("resourceConfig").style.display = "none";
    }
}

// Configuración del recurso
function setResource(){
    let c = resourceIdentification();
    let currentURL = window.location.href;

    //Se identifica el tipo de recurso para configurar solo si se está dentro del recurso
    if (currentURL.indexOf("modedit.php")>0){
        switch (c[2]){
            case "hvp":
                console.log("1");
                setH5P_1();
                setH5P_1();
                document.getElementById("modalConfig").click();
                document.getElementById("id_submitbutton").click();
                break;
            case "folder":
                console.log("2");
                setCar();
                setCar();
                document.getElementById("id_submitbutton").click();
                break;
            case "page":
                console.log("3");
                setPag();
                setPag();
                document.getElementById("id_submitbutton").click();
                break;
            default:
                break;
        }
    }
        
}

function setH5P_1(){
    let buttonUnLockCompletion = document.getElementById('id_unlockcompletion');
    if (buttonUnLockCompletion) {
        setConfig.buttonActivityCompletionUnLock();
        setTimeout(setH5P_2(), 3000);
    }
    else{
        setH5P_2();
    }
}

function setH5P_2(){
    setConfig.checkbox('id_showdescription', false);
    setConfig.checkbox('id_frame', true);
    setConfig.checkbox('id_copyright', true);
    setConfig.input('id_gradepass', 0);
    setConfig.input('id_maximumgrade', 0);
    setConfig.select("id_visible","1");
    setConfig.select("id_groupmode","0");
    setConfig.removeRestrictions();
    
    setConfig.select("id_completion","2");
    setConfig.checkbox('id_completionview', true);
    setConfig.checkbox('id_completionusegrade', true);
    setConfig.checkbox('id_completionexpected_enabled', false);
    setConfig.select("id_competency_rule","0"); 
}

function setCar(){
    let buttonUnLockCompletion = document.getElementById('id_unlockcompletion');
    if (buttonUnLockCompletion) {
        setConfig.buttonActivityCompletionUnLock();
    }
    setConfig.checkbox('id_showdescription', false);
    setConfig.select("id_display","0");
    setConfig.checkbox('id_showexpanded', true);
    setConfig.checkbox('id_showdownloadfolder', true);
    setConfig.checkbox('id_forcedownload', true);
    setConfig.select("id_visible","1");
    setConfig.removeRestrictions();
    
    setConfig.select("id_completion","2")
    setConfig.checkbox('id_completionview', true);
    setConfig.checkbox('id_completionexpected_enabled', false);
    setConfig.select("id_competency_rule","0"); 
}

function setPag(){
    let buttonUnLockCompletion = document.getElementById('id_unlockcompletion');
    if (buttonUnLockCompletion) {
        setConfig.buttonActivityCompletionUnLock();
    }
    setConfig.checkbox('id_showdescription', false);
    setConfig.checkbox('id_printheading', true);
    setConfig.checkbox('id_printintro', false);
    setConfig.checkbox('id_printlastmodified', true);
    setConfig.select("id_visible","1");
    setConfig.removeRestrictions();

    setConfig.select("id_completion","2")
    setConfig.checkbox('id_completionview', true);
    setConfig.checkbox('id_completionexpected_enabled', false);
    setConfig.select("id_competency_rule","0"); 
}


var setConfig = {
    checkbox: function(element, state, focus = null) {
        let fieldCheck = document.getElementById(element);
        fieldCheck.disabled = false;
        if (focus) {
            fieldCheck.focus();
        }
        fieldCheck.checked = state;
        if (focus) {
            fieldCheck.blur();
        }
    },
    input: function(element, assignment) {
        let assignmentField = document.getElementById(element);
        assignmentField.disabled = false;
        assignmentField.value = assignment;
    },
    select: function(element, assignment) {
        let assignmentField = document.getElementById(element);
        if (assignmentField) {
            assignmentField.disabled = false;
            assignmentField.value = assignment;
        } else {
            console.log('--- No se pudo encontrar el elemento ( ' + element + ' )');
        }
    },
    removeRestrictions: function() {
        let json_restriction = document.getElementById("id_availabilityconditionsjson");
        json_restriction.value = '{"op":"&","c":[],"showc":[]}';
    },
    buttonActivityCompletionUnLock: function() {
        document.getElementById("id_unlockcompletion").click();
    },
}