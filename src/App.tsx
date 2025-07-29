// src/App.tsx
import { useEffect, useState } from "react";
import api from "./api";
import AlunoCard from "./components/AlunoCard";
import "./App.css";

type Aluno = {
  id: number;
  nome: string;
  matricula: string;
  presencas: Presenca[];
};

type Presenca = {
  id: number;
  data: string;
};

const App = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [filtro, setFiltro] = useState<"todos" | "presentes" | "faltosos">(
    "todos"
  );
  const hoje = new Date().toISOString().split("T")[0];

  useEffect(() => {
    api.get("/alunos/").then((res) => {
      setAlunos(res.data);
    });
  }, []);

  const marcarPresenca = async (alunoId: number) => {
    const agora = new Date();
    const data = hoje;
    const horaEntrada = agora.toTimeString().split(" ")[0];

    await api.post("/presencas/", {
      aluno: alunoId,
      data,
      hora_entrada: horaEntrada,
      hora_saida: horaEntrada,
    });

    // Atualiza lista após marcar presença
    const res = await api.get("/alunos/");
    setAlunos(res.data);
  };

  const filtrarAlunos = () => {
    if (filtro === "todos") return alunos;
    if (filtro === "presentes")
      return alunos.filter((a) => a.presencas.some((p) => p.data === hoje));
    if (filtro === "faltosos")
      return alunos.filter((a) => !a.presencas.some((p) => p.data === hoje));
  };

  return (
    <div className="container">
      <h1>Registro de Presença</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setFiltro("todos")}>Todos</button>
        <button onClick={() => setFiltro("presentes")}>Presentes</button>
        <button onClick={() => setFiltro("faltosos")}>Faltosos</button>
      </div>

      {filtrarAlunos()?.map((aluno) => (
        <AlunoCard key={aluno.id} aluno={aluno} onPresenca={marcarPresenca} />
      ))}
    </div>
  );
};

export default App;
