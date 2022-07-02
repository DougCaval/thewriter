const { deleteOne } = require("../model/TaskModel");
const TaskModel = require("../model/TaskModel");

const current = new Date();
const {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require("date-fns");

class TaskController {
  //função que vai crair a nova task, usar o async para esperar a rotina do banco de dados
  async create(req, res) {
    const estorias = new TaskModel(req.body);
    await estorias
      .save() //salvar no banco de dados
      .then((response) => {
        return res.status(200).json(response);
      }) //se tudo der certo
      .catch((error) => {
        return res.status(500).json('Erro ao tentar salvar a estória');
      }); //se deu algum erro
  }
  async update(req, res) {
    await TaskModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json('Erro ao tentar fazer um Update ');
      });
  }
  async all(req, res) {
    await TaskModel.find({ macaddress: { $in: req.params.macaddress } })
      .sort("when")
      .then((response) => {
        if (response) return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json('Erro ao tentar visualizar todas as estórias.');
      });
  }

  async show(req, res) {
    await TaskModel.findById(req.params.id)
      .then((response) => {
        if (response) return res.status(200).json(response);
        else return res.status(404).json({ error: "Tarefa não encontrada." });
      })
      .catch((error) => {
        return res.status(500).json('Erro ao tentar exibir as estória');
      });
  }

  async delete(req, res) {
    await TaskModel.deleteOne({ _id: req.params.id })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json('Erro ao tentar deletar a estória.');
      });
  }

  async done(req, res) {
    await TaskModel.findByIdAndUpdate(
      { _id: req.params.id },
      { done: req.params.done },
      { new: true }
    )
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json('Erro ao tentar criar a estória.');
      });
  }
  //atividades atrasadas
  async late(req, res) {
    await TaskModel.find({
      when: { $lt: current },
      macaddress: { $in: req.params.macaddress }, //macaddress para saber as minhas atividades atrasadas
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  //atividades do dia
  async today(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfDay(current), $lt: endOfDay(current) },
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  //tarefas da semana
  async week(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfWeek(current), $lt: endOfWeek(current) },
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  //tarefas do mês
  async month(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfMonth(current), $lt: endOfMonth(current) },
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  //tarefas do ano
  async year(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfYear(current), $lt: endOfYear(current) },
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
}

module.exports = new TaskController();
