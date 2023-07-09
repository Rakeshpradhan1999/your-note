"use client";
import {
  NoteCreationRequest,
  NoteUpdateRequest,
  NoteValidator,
} from "@/lib/validators/note";
import EditorJS from "@editorjs/editorjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import "@/styles/editorjs.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import {
  createNoteRequest,
  deleteNoteRequest,
  updateNoteRequest,
} from "@/services/note.service";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
type FormData = z.infer<typeof NoteValidator>;

interface IEditorProps {
  _id?: string;
  title?: string;
  content?: string;
  refetch?: () => void;
}

const Edior = ({ _id, title, content, refetch }: IEditorProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(NoteValidator),
    defaultValues: {
      title: title || "",
      content: content || null,
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const ref = useRef<EditorJS>();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    // const Code = (await import("@bomdi/codebox")).default;
    // const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    // const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      let block;

      if (content) {
        block = JSON.parse(content);
      }

      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your note...",
        inlineToolbar: false,
        data: block,
        tools: {
          header: Header,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [content]);
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
    },
  });
  const { mutate: updateNote, isLoading: updateLoading } = useMutation({
    mutationFn: updateNoteRequest,
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Success",
        description: "Your note updated.",
      });
      setTimeout(() => {
        refetch && refetch();
      }, 100);
    },
  });

  const { mutate: deleteNote, isLoading: deleteLoading } = useMutation({
    mutationFn: deleteNoteRequest,
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Success",
        description: "Your note deleted.",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
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
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: "Something went wrong.",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save();
    // console.log(blocks);

    const payload: NoteCreationRequest = {
      title: data.title,
      content: blocks,
    };
    if (!_id) {
      return createNote(payload);
    }
    const updatePayload: NoteUpdateRequest = {
      title: data.title,
      content: JSON.stringify(blocks),
      id: _id,
    };
    updateNote(updatePayload);
  }

  if (!isMounted) {
    return null;
  }
  return (
    <div className="max-w-[600px] mx-auto pb-10 mt-6">
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
        <div className="grid grid-flow-col gap-2 justify-start">
          <Button
            disabled={deleteLoading}
            isLoading={isLoading || updateLoading}
          >
            Save Note
          </Button>
          {_id && (
            <Button
              type="button"
              disabled={updateLoading}
              variant={"destructive"}
              onClick={() => deleteNote(_id)}
              isLoading={deleteLoading}
            >
              Delete Note
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Edior;
