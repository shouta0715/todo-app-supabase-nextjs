import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import { Notice, Task } from "../types/types";
import { supabase } from "../utils/supabase";

type StaticProps = {
  tasks: Task[];
  notices: Notice[];
};

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
  const router = useRouter();

  return (
    <Layout title="SSG">
      <p className="mb-3 text-blue-500">SSG</p>
      <ul className="mb-3 text-pink-500">
        {tasks.map((task) => (
          <li key={task.id}>
            <p className="text-lg font-extrabold">{task.title}</p>
          </li>
        ))}
      </ul>
      <ul className="mb-3 text-green-500">
        {notices.map((notice) => (
          <li key={notice.id}>
            <p className="text-lg font-extrabold">{notice.content}</p>
          </li>
        ))}
      </ul>
      <Link href="/ssr" prefetch={false}>
        <a className="my-3 text-xs"> Link to ssr</a>
      </Link>
      <button
        type="button"
        className="mb-3 text-xs"
        onClick={() => router.push("/ssr")}
      >
        Route to ssr
      </button>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  console.log("getStaticProps/ssg invoked");

  //* todosから全件取得
  const { data: tasks } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });

  //* noticesから全件取得
  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: true });

  return { props: { tasks, notices } };
};

export default Ssg;
