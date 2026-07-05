import svgPaths from "./svg-0zuwwpstu7";

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#101828] text-[16px] top-0">Care Plans</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] top-0">Strategic care planning documents defining individualized support approaches</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[56px] items-start left-[32px] top-[86px] w-[1031px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[16px] size-[20px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p232b1d80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3abdf300} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 7.5H6.66667" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 10.8333H6.66667" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 14.1667H6.66667" id="Vector_5" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[40px] left-[48px] top-[16px] w-[965px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[0] left-0 text-[#1c398e] text-[14px] top-0 w-[892px] whitespace-pre-wrap">
        <span className="font-['Nunito:Bold',sans-serif] font-bold leading-[20px]">{`Care Plans `}</span>
        <span className="leading-[20px]">{`define the strategic approach to supporting each service user. For detailed tracking of medications, daily logs, incidents, and activities, view the individual's full profile.`}</span>
      </p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[#eff6ff] border border-[#bedbff] border-solid h-[74px] left-[32px] rounded-[10px] top-[152px] w-[1031px]" data-name="Container">
      <Icon />
      <Paragraph1 />
    </div>
  );
}

export default function CarePlans() {
  return (
    <div className="bg-[#f9fafb] relative size-full" data-name="CarePlans2">
      <Container />
      <Container1 />
    </div>
  );
}