"use client";
import { NoteValidator } from "@/lib/validators/note";
import EditorJS from "@editorjs/editorjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import "@/styles/editorjs.css";
import { useCallback, useEffect, useRef, useState } from "react";
type FormData = z.infer<typeof NoteValidator>;
const Edior = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(NoteValidator),
    defaultValues: {
      title: "",
      content: null,
    },
  });
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    // const Code = (await import("@bomdi/codebox")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your note...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,

          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          // image: {
          //   class: ImageTool,
          //   config: {
          //     uploader: {
          //       async uploadByFile(file: File) {
          //         // upload to uploadthing
          //         const [res] = await uploadFiles([file], "imageUploader");

          //         return {
          //           success: 1,
          //           file: {
          //             url: res.fileUrl,
          //           },
          //         };
          //       },
          //     },
          //   },
          // },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);
  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save();
    console.log(blocks);
    // const payload: PostCreationRequest = {
    //   title: data.title,
    //   content: blocks,
    //   subredditId,
    // }

    // createPost(payload)
  }
  if (!isMounted) {
    return null;
  }
  const { ref: titleRef, ...rest } = register("title");
  return (
    <div className="max-w-[600px] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} id="create-note-form ">
        <div className="prose prose-stone dark:prose-invert ">
          <TextareaAutosize
            placeholder="Title"
            autoFocus
            defaultValue="Untitled Note"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Edior;
