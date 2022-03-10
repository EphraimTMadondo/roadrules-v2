import fs from 'fs';
import {
  DrivingSchool,
  Note,
  QuestionType,
  User,
  Province,
  Question,
  Country,
  Response,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { OldDrivingSchool } from '../data-model/driving-school';
import { OldNote } from '../data-model/note';
import { OldProvince } from '../data-model/province';
import { OldQuestion } from '../data-model/question';
import { OldQuestionType } from '../data-model/question-type';
import { OldResponse } from '../data-model/response';
import { OldUser } from '../data-model/user';
import { prisma } from './db';

const dir = './json';

function readJsonData<DataType>(fileName: string) {
  return new Promise<DataType[]>((resolve, reject) => {
    fs.readFile(`${dir}/${fileName}.json`, 'utf8', (err, result) => {
      if (err) {
        return reject(err);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data }: { data: DataType[] } = JSON.parse(result);
      return resolve(data);
    });
  });
}

async function recordDrivingSchools(drivingSchools: OldDrivingSchool[]) {
  const newDrivingSchools: DrivingSchool[] = drivingSchools.map(
    (drivingSchool) => ({
      id: drivingSchool.id,
      title: drivingSchool.title,
      image: drivingSchool.image,
      html: drivingSchool.html,
      rating: drivingSchool.rating,
      city: drivingSchool.city,
      latitude: new Decimal(drivingSchool.latitude),
      longitude: new Decimal(drivingSchool.longitude),
      cost: drivingSchool.cost,
      phone: drivingSchool.phone,
      whatsapp: drivingSchool.whatsapp,
      messenger: drivingSchool.messenger,
      createdAt: BigInt(drivingSchool.createdAt.toString()),
      updatedAt: BigInt(drivingSchool.updatedAt.toString()),
    })
  );
  await prisma.drivingSchool.createMany({
    data: newDrivingSchools,
  });
}

async function recordNotes(notes: OldNote[]) {
  const newNotes: Note[] = notes.map((note) => ({
    id: note.id,
    refNumber: note.refNumber,
    title: note.title,
    html: note.html,
    createdAt: BigInt(note.createdAt.toString()),
    updatedAt: BigInt(note.updatedAt.toString()),
  }));
  await prisma.note.createMany({
    data: newNotes,
  });
}

type EmbeddedCountry = Omit<Country, 'id'> & {
  provinces: {
    create: Omit<Province, 'countryId'>[];
  };
};

async function recordCountries(provinces: OldProvince[]) {
  const newCountry: EmbeddedCountry = {
    country: 'Zimbabwe',
    provinces: {
      create: provinces.map((province) => ({
        id: province.id,
        province: province.province,
        createdAt: BigInt(new Date().getTime()),
        updatedAt: BigInt(new Date().getTime()),
      })),
    },
    createdAt: BigInt(new Date().getTime()),
    updatedAt: BigInt(new Date().getTime()),
  };

  await prisma.country.create({
    data: newCountry,
  });
}

async function recordQuestions(questions: OldQuestion[]) {
  const newQuestions: Question[] = questions.map((question) => ({
    id: question.id,
    questionTypeId: question.questionTypeId,
    refNumber: question.refNumber,
    text: question.text,
    image: question.image,
    option1: question.option1,
    option2: question.option2,
    option3: question.option3,
    correctOption: question.correctOption,
    correctlyAnswered: question.correctlyAnswered,
    incorrectlyAnswered: question.incorrectlyAnswered,
    explanation: question.explanation,
    createdAt: BigInt(question.createdAt.toString()),
    updatedAt: BigInt(question.updatedAt.toString()),
  }));
  await prisma.question.createMany({
    data: newQuestions,
  });
}

async function recordResponses(responses: OldResponse[]) {
  const newResponses: Response[] = responses.map((response) => ({
    id: response.id,
    questionId: response.questionId,
    userId: response.userId,
    choice: response.choice,
    correct: response.correct,
    createdAt: BigInt(response.createdAt.toString()),
    updatedAt: BigInt(response.updatedAt.toString()),
  }));
  await prisma.response.createMany({
    data: newResponses,
  });
}

async function recordQuestionTypes(questionTypes: OldQuestionType[]) {
  const newQuestionTypes: QuestionType[] = questionTypes.map(
    (questionType) => ({
      id: questionType.id,
      questionType: questionType.questionType,
      createdAt: BigInt(questionType.createdAt.toString()),
      updatedAt: BigInt(questionType.updatedAt.toString()),
    })
  );
  await prisma.questionType.createMany({
    data: newQuestionTypes,
  });
}

async function recordUsers(users: OldUser[]) {
  const newUsers: User[] = users.map((user) => ({
    id: user.id,
    username: user.username,
    pin: user.pin || '',
    kind: user.kind,
    firstName: user.fullName.split(' ')[0],
    lastName: user.fullName.split(' ')?.[1] || '',
    gender: 'Male',
    phoneNumber: user.phoneNumber,
    provinceId: 1,
    createdAt: BigInt(user.createdAt.toString()),
    updatedAt: BigInt(user.updatedAt.toString()),
  }));

  await prisma.user.createMany({
    data: newUsers,
  });
}

async function main() {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const [
    drivingSchools,
    notes,
    provinces,
    questions,
    questionTypes,
    responses,
    users,
  ] = await Promise.all([
    readJsonData<OldDrivingSchool>('drivingSchools'),
    readJsonData<OldNote>('notes'),
    readJsonData<OldProvince>('provinces'),
    readJsonData<OldQuestion>('questions'),
    readJsonData<OldQuestionType>('questionTypes'),
    readJsonData<OldResponse>('responses'),
    readJsonData<OldUser>('users'),
  ]);

  const tasks = [
    () => recordDrivingSchools(drivingSchools),
    () => recordNotes(notes),
    () => recordCountries(provinces),
    () => recordUsers(users),
    () => recordQuestionTypes(questionTypes),
    () => recordQuestions(questions),
    () => recordResponses(responses),
  ];

  await tasks.reduce(async (acc, current) => {
    await acc;
    return current();
  }, Promise.resolve());
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
