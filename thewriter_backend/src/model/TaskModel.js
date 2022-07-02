const { default: mongoose } = require("../config/database");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  //endereço do celular
  macaddress: { type: String, required: true },
  // tipo de tarefa
  type: { type: Number, required: true },
  //titulo da estória
  title: { type: String, required: true },
  //descrição do EU COMO
  euComo: { type: String, required: true },
  //descrição do EU QUERO
  euQuero: { type: String, required: true },
  //descrição do PARA
  para: { type: String, required: true },
  //descrição dos CENÁRIOS
  cenarios: { type: String, required: true },
  //descrição dos DETALHES TÉCNICOS
  detalhesTecnicos: { type: String, required: true },
  //descrição dos PROTÓTIPOS
  prototipos: { type: String, required: true },
  //descrição dos AMBIENTES
  ambientes: { type: String, required: true },
  //Data que será realizada a tarefa
  when: { type: Date, required: true },
  //botão se finalizada ou não
  done: { type: Boolean, default: false },
  //momento emq ue foi criada
  created: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("ESTORIAS", TaskSchema);
