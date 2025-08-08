import hero from "@/assets/hero-civic-kanban.jpg";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="container py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Kanban Prefeitura de Cabo Frio</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Organize o trabalho por secretarias com boards, listas e cards. Colaboração segura com verificação por telefone.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="/register"><Button variant="hero">Criar conta</Button></a>
          <a href="/login"><Button variant="secondary">Entrar</Button></a>
        </div>
      </header>

      <section className="container">
        <div className="rounded-xl overflow-hidden shadow-[var(--shadow-elev)]">
          <img src={hero} alt="Ilustração cívica com quadros Kanban" loading="lazy" className="w-full h-[320px] object-cover" />
        </div>
      </section>

      <section className="container py-12 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-xl font-semibold mb-2">Estrutura Trello-like</h2>
          <p className="text-muted-foreground">Boards por setor, listas e cards com labels, membros e checklists.</p>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-xl font-semibold mb-2">Segurança e Auditoria</h2>
          <p className="text-muted-foreground">Acesso por papéis e histórico de atividade para rastreabilidade.</p>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-xl font-semibold mb-2">Pronto para Automação</h2>
          <p className="text-muted-foreground">Base para webhooks e futuras integrações por telefone.</p>
        </div>
      </section>

      <footer className="container py-10 text-center text-sm text-muted-foreground">
        <a href="/sectors" className="underline">Explorar setores</a>
      </footer>
    </div>
  );
};

export default Index;
