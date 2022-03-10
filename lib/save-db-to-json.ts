import fs from 'fs';
import { prisma } from './db';

const dir = './json';

function saveJsonData(fileName: string, data: string) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(`${dir}/${fileName}.json`, data, 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      console.log(`${fileName} saved`);
      resolve();
    });
  });
}

async function saveTableRecords<DataType>(
  destFileName: string,
  data: DataType
) {
  await saveJsonData(destFileName, JSON.stringify({ data }));
}

async function saveNotes() {
  await saveTableRecords('notes', await prisma.note.findMany());
}

async function saveQuestions() {
  await saveTableRecords('questions', await prisma.question.findMany());
}

async function saveDrivingSchools() {
  await saveTableRecords(
    'drivingSchools',
    await prisma.drivingSchool.findMany()
  );
}

async function saveProvinces() {
  await saveTableRecords('provinces', await prisma.province.findMany());
}

async function saveQuestionTypes() {
  await saveTableRecords('questionTypes', await prisma.questionType.findMany());
}

async function saveResponses() {
  await saveTableRecords('responses', await prisma.response.findMany());
}

async function saveUsers() {
  await saveTableRecords('users', await prisma.user.findMany());
}

async function main() {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  await Promise.all([
    saveNotes(),
    saveQuestions(),
    saveDrivingSchools(),
    saveProvinces(),
    saveQuestionTypes(),
    saveResponses(),
    saveUsers(),
  ]);
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
