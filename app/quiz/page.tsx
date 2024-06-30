import React from "react";
import Quiz from "../../components/Quiz";
import { client } from "../../sanity/lib/client";
import { fetchUsers } from "../(auth)/actions/fetchUsers";

export const dynamic = "force-dynamic";
async function getData() {
  const query = `*[_type == "questions"]{
    question,
    answers,
    correctAnswers
  }`;
  const data = await client.fetch(query);
  return data;
}

const Page = async () => {
  const questions = await getData();
  const user = await fetchUsers();
  const userId = user?.data.user?.id;
  

  return (
    <>
      <Quiz  questions={questions} userId={userId}/>
    </>
  );
};

export default Page;
