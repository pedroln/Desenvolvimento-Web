var campus = []
const alunos = require("../controller/alunos.js");

module.exports.listaCampus = function(req, res){
    res.json(campus);
}

module.exports.obterCampus = function(req, res){
    var codigo = req.params.codigo;
    var _campus = campus.find(_campus => (_campus.codigo == codigo));
    if (_campus){
        res.json(_campus);
    } else{
        res.status(404).send("Campus não encontrado");
    }
}

module.exports.inserirCampus = function(req, res){
    let codigo = req.body.codigo;
    var _campusInserir = campus.find(_campusInserir => (_campusInserir.codigo == codigo));
    if (_campusInserir){
        res.status(500).send("Campus ja existente");
    }
    
    else{
        if (req.body.cursos < 1){
            res.status(500).send("É necessário o campus possuir ao menos um curso");
        }

        else{
            let campusInserir = req.body;
            campus.push(campusInserir);
            res.status(200).send(campusInserir);
            res.json(campus);
        }

    }

   
}

module.exports.atualizarCampus = function(req, res){
    let codigo = req.params.codigo;
    var _campusAtualizar = campus.find(_campusInserir => (_campusInserir.codigo == codigo));
    if (_campusAtualizar){
        if (req.body.cursos < 1){
            res.status(500).send("É necessário o campus possuir ao menos um curso");
        }

        else{
            _campusAtualizar.campus = req.body.campus;
            _campusAtualizar.cursos = req.body.cursos;
            res.json(_campusAtualizar);
        }
    }
    else{
        res.status(404).send("Campus não encontrado");
    }
}


module.exports.removerCampus = function(req, res){
    let codigo = req.params.codigo;
    let _campusRemover = campus.find(_campusRemover => (_campusRemover.codigo == codigo));
    if (_campusRemover){
        const index = campus.indexOf(_campusRemover)
        campus.splice(index,1);
        alunos.removerAlunoCampi(_campusRemover.campus);
        res.json(_campusRemover);
    } else{
        res.status(404).send("Campus não encontrado");
    }
}

module.exports.retornaCampus = function(req, res){
    return campus;
}