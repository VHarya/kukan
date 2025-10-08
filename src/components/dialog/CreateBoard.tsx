import { createBoard } from "@/libs/actions/board";
import { useActionState, useRef, useState } from "react";
import PortalBody from "../PortalBody";

export default function CreateBoard() {
  const overlay = useRef(null);
  const [show, setShow] = useState(false);
  const [error, formAction, isLoading] = useActionState(createBoard, "");

  return (
    <>
      <button
        type="button"
        onClick={() => setShow(true)}
        className="p-4 flex justify-center items-center rounded-xl bg-primary text-on-primary"
      >
        <span className="whitespace-nowrap font-medium">Create Board</span>
      </button>

      {show && (
        <PortalBody>
          <div
            ref={overlay}
            onClick={(e) => {
              if (e.currentTarget === overlay.current) {
                setShow(false);
              }
            }}
            className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-black/15"
          >
            <form
              action={formAction}
              className="w-lg p-4 flex flex-col font-sans rounded-xl bg-surface"
            >
              <label htmlFor="title" className="mb-1 font-medium">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="New Board"
                className="mb-4 p-2"
              />

              <label htmlFor="tags" className="mb-1 font-medium">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                placeholder="#example #another_example #c001_example"
                className="mb-4 p-2"
              />

              <div className="flex space-x-4 self-end">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl font-medium text-error"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-medium bg-primary text-on-primary"
                >
                  Create Board
                </button>
              </div>
            </form>
          </div>
        </PortalBody>
      )}
    </>
  );
}
