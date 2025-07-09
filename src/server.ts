import Fastify from 'fastify';
import cors from '@fastify/cors';

const server = Fastify({ logger: true });
const races = [
  { id: 1, name: "GP da Austrália", location: "Melbourne", date: "2025-03-16" },
  { id: 2, name: "GP de Mônaco", location: "Monte Carlo", date: "2025-05-25" },
  { id: 3, name: "GP do Brasil", location: "São Paulo", date: "2025-11-09" },
];
const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy" },
  { id: 5, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 7, name: "Alfa Romeo Racing", base: "Hinwil, Switzerland" },
  { id: 8, name: "AlphaTauri", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Haas", base: "Kannapolis, United States" },
  { id: 11, name: "Uralkali Haas F1 Team", base: "Banbury, United Kingdom" },
  { id: 12, name: "Scuderia Toro Rosso", base: "Faenza, Italy" },
];

interface RacersParams {
    id: string;
}

server.register(cors, {
  origin: '*',
});

server.get('/', async (request, response) => {
    response.type("application/json").code(200);
  return { message: 'API de Fórmula 1 com TypeScript!' };
});

server.get('/races', async (request, response) => {
      response.type("application/json").code(200);

  return { races };
});
server.get<{ Params: RacersParams }>(
  "/races/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const race = races.find((d) => d.id === id);

    if (!race) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      response.type("application/json").code(200);
      return { driver: race };
    }
  }
);
server.get('/teams', async (request, response) => {
      response.type("application/json").code(200);

  return { teams };
});
server.listen({ port: 3333 });