import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { CustomCenter } from '../components/custom-center';
import Layout from '../components/layout';
import { UNIT } from '../lib/units';
import Typography from '@mui/material/Typography';

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
          <div className="row start-center">
            <span style={{ fontWeight: "bold", fontSize: "1.2em", padding: UNIT * 2 }}>
              Notes
            </span>
          </div>
        </CustomCenter>
      </div>

      <div className="row center-center">
        <CustomCenter>
          <div className="row-wrap start-stretch">
            {
              notes
                .map( ( note, index ) => (
                  <div
                    key={index}
                    className="column start-stretch gt-sm-50"
                    style={{ height: "auto", padding: UNIT * 2 }}
                  >
                    <div
                      className="card link pointed column start-start"
                      style={{ height: "100%", padding: UNIT }}>
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
