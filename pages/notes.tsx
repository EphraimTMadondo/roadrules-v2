import Head from 'next/head';
import { CustomCenter } from '../components/custom-center';
import Layout from '../components/layout';

export default function Notes () {

  const notes = [
    "ZIMBABWE'S ROAD RULES",
    "TEST SYLLABUS",
    "LEARNER DRIVER'S LICENSE TEST",
    "DRIVER'S LICENSE CLASSES",
    "VEHICLE CLASSES",
    "VEHICLE DOCUMENTATION",
    "PERSONS WITH DIASABILITIES",
    "REQUIRED DOCUMENTATION",
    "SPEED LIMITS",
    "NIGHT DRIVING",
    "OVERTAKING",
    "DRIVING ON AN UPHILL OR DOWNHILL",
    "ROAD LANE USE",
    "SPECIAL VEHICLES",
    "INTRODUCTION TO DRIVING",
    "TRAFFIC SIGNS & SIGNALS",
    "HAZARDOUS CONDITIONS"
  ];

  return (
    <Layout>

      <Head>
        <title>Road Rules - Notes</title>
      </Head>

      <div className="row center-center">
        <CustomCenter>
          <div className="row-wrap start-stretch">
            {
              notes
                .map( ( note, index ) => (
                  <div
                    key={index}
                    className="column start-stretch gt-sm-50"
                    style={{ height: "auto", padding: 8 * 2 }}
                  >
                    <div
                      className="card link pointed column start-start"
                      style={{ height: "100%", padding: 8 }}>
                      <span style={{ fontSize: "1.5em" }}>
                        {note}
                      </span>
                    </div>
                  </div>
                ) )
            }
          </div>
        </CustomCenter>
      </div>

    </Layout>
  )
}
