import FlexContent from "../../reusable/FlexContent";

interface Props {
  phrase: string;
  added_points: number;
  before_points: number;
  after_points: number;
  message: string;
  date: string;
}

export default function DetailsContent(props: Props) {
  return (
    <>
      <section className="body-font ">
        <div className="border border-gray-200 p-5 rounded-lg shadow-xl ">
          <div className="flex justify-start items-center w-full mb-4">
            <div className="flex flex-col w-full">
              <FlexContent
                label="Phrase"
                value={props.phrase}
                classes="w-[100%!important]"
              />
              <FlexContent
                label="Date"
                value={new Date(props.date).toLocaleString()}
                classes="w-[100%!important]"
              />
              <FlexContent
                label="Message"
                value={
                  props.message.length > 50
                    ? props.message.substring(0, 50) + "..."
                    : props.message
                }
                classes="w-[100%!important]"
              />

              <FlexContent
                label="Before Points"
                value={props.before_points.toString()}
                classes="w-[100%!important]"
              />
              <FlexContent
                label="Added Points"
                value={props.added_points === undefined?"0": props.added_points.toString()}
                classes="w-[100%!important]"
              />
              <FlexContent
                label="After Points"
                value={props.after_points.toString()}
                classes="w-[100%!important]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
