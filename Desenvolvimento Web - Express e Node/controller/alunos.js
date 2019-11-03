var alunos = [];
const campusController = require("../controller/campus.js");
var campus = [];

module.exports.listaAlunos = function(req, res){
    
    if(req.query.campus){
        var busca = [];
        if(req.query.curso){
            for (var i = 0; i < alunos.length; i++) {
                if(alunos[i].campus == req.query.campus){
                    if(alunos[i].curso == req.query.curso){
                    busca.push(alunos[i]);
                    }
                }
            }
            if(busca.length == 0){
                res.status(404).send("Aluno no curso/campus especificado não encontrado");

            }
            else{
                res.json(busca)
            }
        }
        else{
            for (var i = 0; i < alunos.length; i++) {
                if(alunos[i].campus == req.query.campus){
                    busca.push(alunos[i]);
                }   
            }
            if(busca.length == 0){
                res.status(404).send("Aluno no curso/campus especificado não encontrado");

            }
            else{
                res.json(busca)
            }
        }
    }
    if(req.query.curso){
        var busca = [];
        if(req.query.campus){
            for (var i = 0; i < alunos.length; i++) {
                if(alunos[i].curso == req.query.curso){
                    if(alunos[i].campus == req.query.campus){
                    busca.push(alunos[i]);
                    }
                }
            }
            if(busca.length == 0){
                res.status(404).send("Aluno no curso/campus especificado não encontrado");

            }
            else{
                res.json(busca)
            }
        }

        else{
            for (var i = 0; i < alunos.length; i++) {
                if(alunos[i].curso == req.query.curso){
                    busca.push(alunos[i]);
                }
            }
            if(busca.length == 0){
                res.status(404).send("Aluno no curso/campus especificado não encontrado");

            }
            else{
                res.json(busca)
            }
        }

    }

    else{
        res.json(alunos);
    }
}

module.exports.obterAluno = function(req, res){
    var mat = req.params.matricula;
    var _alunoBusca = alunos.find(_alunoBusca => (_alunoBusca.matricula == mat));

    if (_alunoBusca){
         res.json(_alunoBusca);
    } 
    else{
        res.status(404).send("Aluno não encontrado");
    }
}

module.exports.inserirAluno = function(req, res){
    let aluno = req.body;
    campus = campusController.retornaCampus();
    var _campus = campus.find(_campus => (_campus.campus == req.body.campus));
    if(_campus){
        var _aluno = alunos.find(_aluno => (_aluno.matricula == aluno.matricula));
        if (_aluno){
            res.status(500).send("Aluno com este numero de matricula ja existente");
        }
        else{    
            alunos.push(aluno);
            res.status(200).send(aluno);
        }
    }
    else{
        res.status(404).send("Campus não existe");
    }
}


module.exports.atualizarAluno = function(req, res){
    let id = req.params.matricula;
    campus = campusController.retornaCampus();
    var _campus = campus.find(_campus => (_campus.campus == req.body.campus));
    if(_campus){
        let _alunoAtualizar = alunos.find(_alunoAtualizar => (_alunoAtualizar.matricula == id));
        if (_alunoAtualizar){
            _alunoAtualizar.nome = req.body.nome;
            _alunoAtualizar.data = req.body.data;
            _alunoAtualizar.email = req.body.email;
            _alunoAtualizar.ddd = req.body.ddd;
            _alunoAtualizar.numero = req.body.numero;
            _alunoAtualizar.operadora = req.body.operadora;
            _alunoAtualizar.campus = req.body.campus;
            _alunoAtualizar.curso = req.body.curso;
            res.json(_alunoAtualizar);
        }
        else{
            res.status(404).send("Aluno não encontrado");
        }
    }
    else{
        res.status(404).send("Campus não encontrado");
    }
}

module.exports.removerAluno = function(req, res){
    let id = req.params.matricula;
    let _alunoRemover = alunos.find(_alunoRemover => (_alunoRemover.matricula == id));
    if (_alunoRemover){
        const index = alunos.indexOf(_alunoRemover)
        alunos.splice(index,1);
        res.json(_alunoRemover);
    } else{
        res.status(404).send("Aluno não encontrado");
    }
}

module.exports.removerAlunoCampi = function(campus){
    var i = alunos.length;
    while (i--) {
        if (alunos[i].campus == campus) { 
            alunos.splice(i, 1);
        } 
    }
}



