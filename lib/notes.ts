export interface Note {
  id: number;
  title: string;
  content: string;
}

const NOTES: Note[] = [
  {
    title: "ZIMBABWE'S ROAD RULES",
    content: `There are four fundamental rules of the road covered in the provisional license test.**Rule # 1**: The Zimbabwean rule of the road states that vehicles should keep well left and give way to traffic on your right hand side.**Diagram #1**![image alt text](image_0.jpg)**Car B** goes 1st.According to (**Rule #1**) "give way to traffic approaching from the road on your right"**Car A** gives way to **Car B**, therefore **Car B** goes 1st because he has no traffic on his right.**Rule # 2**:Never turn right in front of oncoming traffic.**Diagram # 2**![image alt text](image_1.jpg)According to (**Rule #1**) "give way to traffic approaching from the road on your right"**Car C** goes 1st, **Car B** goes 2nd and **Car A** goes last**Car A** gives way to **Car B** and **Car B** gives way to **Car C. Car C** should go 1st**provided he is not **turning right in-front of oncoming traffic. If a vehicle with traffic on its right hand side does not have the intention of turning right in front of oncoming traffic, it can proceed straight ahead. **Car B** goes 2nd since he has no traffic on his right after **Car C** has gone. Thereafter **Car A** finally goes last. **Rule # 3**: In rural areas give way to traffic that has entered the intersection first.**Diagram # 3**![image alt text](image_2.jpg)**Car C** has nothing on its right but intends to turn right in front of oncoming traffic. **Car C** should not break **Road Rule # 2** "never turn right in front of oncoming traffic". Therefore **Car A **which is classified as "oncoming traffic" goes 1st, then **Car C** can follow and finally **Car B** goes last.**Frequently Asked Question by Students on This Diagram**Why does **Car A** go 1st and yet it has **Car B** on its right hand side if we always say "give way to traffic on your right hand side?**The Explanation****Car C **gives **Car A **the right to go first so that he (**Car C**) can be able to turn right without him (**Car C**) breaking the law (Road Rule # 2 which says "never turn right in front of oncoming traffic". By so doing **Car C** moves to the middle of the road and blocks **Car B** as **Car A** is passing.After **Car A** has passed, **Car C** turns right and lastly **Car B** then turns right lastly.**Rule # 4**: At traffic circles or roundabouts, give way to traffic already circulating.**General Notes:*** When reversing, a seat belt is not necessary.* Vehicle being driven should display L - Plates at the front and rear of the vehicle when approaching vehicle displaying L Plates extreme caution.**Controlled**** Intersections**The general rule is that **the vehicle facing a control sign to its left side should stop or give way to all crossing traffic.****Diagram # 4**![image alt text](image_3.jpg)Under normal circumstances (in the absence of the control sign), **Car A** should give way to **Car B** because **Car B** is to his right. However, in the diagram above **Car B** has been controlled / regulated by the presence of that sign, therefore **Car A** goes first. The sign supersedes the rule of giving way to traffic on your right.`
  },
  {
    title: "TEST SYLLABUS",
    content: "TEST SYLLABUS"
  },
  // {
  //   title: "LEARNER DRIVER'S LICENSE TEST",
  //   content: "LEARNER DRIVER'S LICENSE TEST"
  // },
  // {
  //   title: "DRIVER'S LICENSE CLASSES",
  //   content: "DRIVER'S LICENSE CLASSES"
  // },
  // {
  //   title: "VEHICLE CLASSES",
  //   content: "VEHICLE CLASSES"
  // },
  // {
  //   title: "VEHICLE DOCUMENTATION",
  //   content: "VEHICLE DOCUMENTATION"
  // },
  // {
  //   title: "PERSONS WITH DIASABILITIES",
  //   content: "PERSONS WITH DIASABILITIES"
  // },
  // {
  //   title: "REQUIRED DOCUMENTATION",
  //   content: "REQUIRED DOCUMENTATION"
  // },
  // {
  //   title: "SPEED LIMITS",
  //   content: "SPEED LIMITS"
  // },
  // {
  //   title: "NIGHT DRIVING",
  //   content: "NIGHT DRIVING"
  // },
  // {
  //   title: "OVERTAKING",
  //   content: "OVERTAKING"
  // },
  // {
  //   title: "DRIVING ON AN UPHILL OR DOWNHILL",
  //   content: "DRIVING ON AN UPHILL OR DOWNHILL"
  // },
  // {
  //   title: "ROAD LANE USE",
  //   content: "ROAD LANE USE"
  // },
  // {
  //   title: "SPECIAL VEHICLES",
  //   content: "SPECIAL VEHICLES"
  // },
  // {
  //   title: "INTRODUCTION TO DRIVING",
  //   content: "INTRODUCTION TO DRIVING"
  // },
  // {
  //   title: "TRAFFIC SIGNS & SIGNALS",
  //   content: "TRAFFIC SIGNS & SIGNALS"
  // },
  // {
  //   title: "HAZARDOUS CONDITIONS",
  //   content: "HAZARDOUS CONDITIONS"
  // }
]
  .map( ( note, index ) => {

    return {
      id: index + 1,
      title: note.title,
      content: note.content
    };

  } );

export function getNotes () {

  return NOTES;

}