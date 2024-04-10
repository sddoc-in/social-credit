import FlexContent from "../../reusable/FlexContent";

interface Props {
  userId: any;
  username: string;
  added_points: number;
  message: string;
  date: string;
}

export default function DetailsContent(props: Props) {


  return (
    <>
      <a href={"/dashboard/user/discord/details/view/" + props.userId}>
        <section className="text-gray-600 body-font ">
          <div className="border border-gray-200 p-5 rounded-lg shadow-xl ">
            <div className="flex justify-start items-center w-full mb-4">
              <div className="flex flex-col w-full">
                <FlexContent
                  label="Username"
                  value={props.username}
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
                  label="Added Points"
                  value={props.added_points.toString()}
                  classes="w-[100%!important]"
                />
              </div>
            </div>
          </div>
        </section>
      </a>
    </>
  );
}
