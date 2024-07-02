import React, { useEffect } from "react";
import Quiz from "../../components/Quiz";
import { client } from "../../sanity/lib/client";
import { fetchUsers } from "../(auth)/actions/fetchUsers";
import LayoutProvider from "../../providers/LayoutProvider";
import { redirectToHomeIfNoUser } from "../(auth)/actions/auth";

export const dynamic = "force-dynamic";
async function getData() {
  const timestamp = new Date().getTime();
  const query = `*[_type == "questions"] | order(_updatedAt desc)[0..15] {
    question,
    answers,
    correctAnswer
  }`;

  try {
    const data = await client.fetch(query, { ts: timestamp });
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}
const Page = async () => {
  const questions = await getData();
  const user = await fetchUsers();
  const userId = user?.data.user?.id;



  return (
    <>
   <LayoutProvider><Quiz questions={questions} userId={userId} /></LayoutProvider>  
    </>
  );
};

export default Page;
