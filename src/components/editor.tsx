"use client";
import { NoteCreationRequest, NoteValidator } from "@/lib/validators/note";
import EditorJS from "@editorjs/editorjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import "@/styles/editorjs.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { createNoteRequest } from "@/services/note.service";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
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
  const { toast } = useToast();
  const router = useRouter();
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
        // data: { blocks: [] },
        tools: {
          header: Header,
          // linkTool: {
          //   class: LinkTool,
          //   config: {
          //     endpoint: "/api/link",
          //   },
          // },
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
  const { mutate: createNote, isLoading } = useMutation({
    mutationFn: createNoteRequest,
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Success",
        description: "Your note saved.",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  });

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
    // console.log(data);
    const payload: NoteCreationRequest = {
      title: data.title,
      content: blocks,
    };
    createNote(payload);
    // createPost(payload)
  }
  if (!isMounted) {
    return null;
  }
  // const { ref: titleRef } = register("title");
  return (
    <div className="max-w-[600px] mx-auto pb-10">
      <form onSubmit={handleSubmit(onSubmit)} id="create-note-form ">
        <div className="prose prose-stone dark:prose-invert mb-2 ">
          <TextareaAutosize
            placeholder="Title"
            {...register("title")}
            autoFocus
            defaultValue="Untitled Note"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[400px]" />
          <p className="text-sm text-gray-500 mb-4">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
        <Button isLoading={isLoading} className="w-full">
          Save
        </Button>
      </form>
    </div>
  );
};

export default Edior;
