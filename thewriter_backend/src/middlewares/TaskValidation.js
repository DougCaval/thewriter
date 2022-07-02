const TaskModel = require("../model/TaskModel");

const { isPast } = require("date-fns");

const TaskValidation = async (req, res, next) => {
  const { macaddress, type, title, euComo , euQuero, para , cenarios, detalhesTecnicos, prototipos, ambientes,  when } = req.body;

  if (!macaddress)
    return res
      .status(400)
      .json({ error: "Atenção: macaddress é obrigatório!" });
  else if (!type)
    return res
      .status(400)
      .json({ error: "Atenção: o tipo de estória é obrigatório." });
  else if (!title)
    return res
      .status(400)
      .json({ error: "Atenção: você precisa dar um título a sua estória." });
  else if (!euComo)
    return res
      .status(400)
      .json({ error: "Atenção: inclua uma descrição de EU COMO  a sua estória." });
      else if (!euQuero)
    return res
      .status(400)
      .json({ error: "Atenção: inclua uma descrição de EU QUERO a sua estória.." });
      else if (!para)
    return res
      .status(400)
      .json({ error: "Atenção: inclua uma descrição de PARA a sua estória." });
      else if (!cenarios)
    return res
      .status(400)
      .json({ error: "Atenção: inclua uma descrição de CENÁRIOS a sua estória." });
      else if (!detalhesTecnicos)
    return res
      .status(400)
      .json({ error: "Atenção: inclua uma descrição de DETALHES TÉCNICOS a sua estória." });
      else if (!prototipos)
    return res
      .status(400)
      .json({ error: "Atenção: inclua uma descrição de PROTÓTIPOS a sua estória." });
      else if (!ambientes)
    return res
      .status(400)
      .json({ error: "Atenção: inclua uma descrição de AMBIENTES  sua estória." });
  else if (!when)
    return res.status(400).json({
      error: "Atenção: escolha uma data e um horário para sua atividade.",
    });
  else {
    let exists;

    if (req.params.id) {
      exists = await TaskModel.findOne({
        _id: { $ne: req.params.id },
        when: { $eq: new Date(when) },
        macaddress: { $in: macaddress },
      });
    } else {
      if (isPast(new Date(when)))
        return res
          .status(400)
          .json({ error: "Atenção: escolha uma data e um horário futuro." });
      exists = await TaskModel.findOne({
        when: { $eq: new Date(when) },
        macaddress: { $in: macaddress },
      });
    }
    if (exists) {
      return res.status(400).json({
        error:
          "Atenção: já existe uma atividade nesta data e horário criada para você",
      });
    }
    next();
  }
};

module.exports = TaskValidation;
