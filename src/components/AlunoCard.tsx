
type AlunoProps = {
  aluno: {
    id: number;
    nome: string;
    matricula: string;
    presencas: { data: string }[];
  };
  onPresenca: (alunoId: number) => void;
};

const hoje = new Date().toISOString().split("T")[0];

const AlunoCard = ({ aluno, onPresenca }: AlunoProps) => {
  const presenteHoje = aluno.presencas.some((p) => p.data === hoje);

  return (
    <div style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
      <strong>{aluno.nome}</strong> — Matrícula: {aluno.matricula}
      <br />
      {presenteHoje ? (
        <span style={{ color: "green" }}>Presente hoje</span>
      ) : (
        <button onClick={() => onPresenca(aluno.id)}>Marcar Presença</button>
      )}
    </div>
  );
};

export default AlunoCard;
