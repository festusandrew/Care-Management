import svgPaths from "./svg-iz9vfehgu8";

function Heading() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#101828] text-[30px] text-nowrap top-[-1px]">Dashboard</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[14px]">Care management overview and key metrics</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[60px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#101828] text-[18px] text-nowrap top-0">Total Care Hours (This Week)</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[40px] left-0 text-[#101828] text-[36px] text-nowrap top-[-1px]">148</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">hours delivered</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[60px] relative shrink-0 w-[96.969px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3ac0b600} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3c797180} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#00a63e] text-[14px] text-nowrap">+12%</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[62.234px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon />
        <Text />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="content-stretch flex h-[60px] items-end justify-between relative shrink-0 w-full" data-name="App">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[17.86%_86.03%_5%_3.18%]" data-name="Group">
      <div className="absolute inset-[17.86%_86.03%_5%_3.18%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.9629 77.1429">
          <path d={svgPaths.p2dbe82f0} fill="var(--fill-0, #1D4ED8)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[24.29%_72.26%_5%_16.95%]" data-name="Group">
      <div className="absolute inset-[24.29%_72.26%_5%_16.95%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.9629 70.7143">
          <path d={svgPaths.p2f455580} fill="var(--fill-0, #1D4ED8)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[11.43%_58.49%_5%_30.72%]" data-name="Group">
      <div className="absolute inset-[11.43%_58.49%_5%_30.72%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.9629 83.5714">
          <path d={svgPaths.p32406100} fill="var(--fill-0, #1D4ED8)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[27.5%_44.72%_5%_44.49%]" data-name="Group">
      <div className="absolute inset-[27.5%_44.72%_5%_44.49%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.9629 67.5">
          <path d={svgPaths.pa78780} fill="var(--fill-0, #1D4ED8)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[5%_30.95%_5%_58.26%]" data-name="Group">
      <div className="absolute inset-[5%_30.95%_5%_58.26%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.9629 90">
          <path d={svgPaths.p2f561080} fill="var(--fill-0, #1D4ED8)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[46.79%_17.17%_5%_72.03%]" data-name="Group">
      <div className="absolute inset-[46.79%_17.17%_5%_72.03%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.9629 48.2143">
          <path d={svgPaths.p17ad7e00} fill="var(--fill-0, #1D4ED8)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[56.43%_3.4%_5%_85.81%]" data-name="Group">
      <div className="absolute inset-[56.43%_3.4%_5%_85.81%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.9629 38.5714">
          <path d={svgPaths.p3e613cb2} fill="var(--fill-0, #1D4ED8)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[5%_3.4%_5%_3.18%]" data-name="Group">
      <Group />
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[5%_3.4%_5%_3.18%]" data-name="Group">
      <Group7 />
    </div>
  );
}

function RechartsBarR3A() {
  return (
    <div className="absolute contents inset-[5%_3.4%_5%_3.18%]" data-name="recharts-bar-:r3a:">
      <Group8 />
    </div>
  );
}

function RechartsZindex300R3D() {
  return (
    <div className="absolute contents inset-[5%_3.4%_5%_3.18%]" data-name="recharts-zindex-300-:r3d:">
      <RechartsBarR3A />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[100px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <RechartsZindex300R3D />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col h-[100px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Card() {
  return (
    <div className="relative bg-white content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] rounded-[10px] w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Heading2 />
      <App />
      <Container5 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#101828] text-[18px] text-nowrap top-0">Shift Coverage</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[10%_6.83%]" data-name="Group">
      <div className="absolute inset-[10%_6.83%]" data-name="Vector">
        <div className="absolute inset-[-0.42%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 121 121">
            <path d={svgPaths.p334a2f00} fill="var(--fill-0, #10B981)" id="Vector" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute bottom-[17.64%] contents left-[66.91%] right-[6.83%] top-1/2" data-name="Group">
      <div className="absolute bottom-[17.64%] left-[66.91%] right-[6.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1.03%_-1.37%_-1.44%_-1.91%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.687 49.7394">
            <path d={svgPaths.p3ba6b9c0} fill="var(--fill-0, #F59E0B)" id="Vector" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[10%_6.83%]" data-name="Group">
      <Group9 />
      <Group10 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[10%_6.83%]" data-name="Group">
      <Group11 />
    </div>
  );
}

function RechartsZindex100R3O() {
  return (
    <div className="absolute contents inset-[10%_6.83%]" data-name="recharts-zindex-100-:r3o:">
      <Group12 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[150px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <RechartsZindex100R3O />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[150px] items-start left-0 top-0 w-[139px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[138.844px]" data-name="Container">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[40px] left-0 text-[#101828] text-[36px] text-nowrap top-[-1px]">85%</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[48px] w-[138.844px]" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[14px]">coverage rate</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#fef3c6] content-stretch flex h-[22px] items-center left-0 px-[11px] py-[3px] rounded-[3.35544e+07px] top-[82px] w-[132.906px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#fee685] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#bb4d00] text-[12px] text-nowrap">2 shifts understaffed</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[104px] left-[138.84px] top-[23px] w-[138.844px]" data-name="Container">
      <Container7 />
      <Container8 />
      <Badge />
    </div>
  );
}

function App1() {
  return (
    <div className="h-[150px] relative shrink-0 w-full" data-name="App">
      <Container6 />
      <Container9 />
    </div>
  );
}

function Card1() {
  return (
    <div className="relative bg-white content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] rounded-[10px] w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Heading3 />
      <App1 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#101828] text-[18px] text-nowrap top-0">{`Service Users' Mood Trends (7 Days)`}</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[32.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[#0a0a0a] text-[24px]">😊</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#364153] text-[14px] text-nowrap">Happy</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[32px] relative shrink-0 w-[82.453px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text1 />
        <Text2 />
      </div>
    </div>
  );
}

function Container11() {
  return <div className="bg-[#10b981] h-[8px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container12() {
  return (
    <div className="basis-0 bg-[#e5e7eb] grow h-[8px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Container">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-0 pr-[52.813px] py-0 relative size-full">
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[32px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[14px]">45</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[136px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container12 />
        <Text3 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container13 />
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[#0a0a0a] text-[24px]">😌</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[32.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#364153] text-[14px] text-nowrap">Calm</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[32px] relative shrink-0 w-[73.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text4 />
        <Text5 />
      </div>
    </div>
  );
}

function Container16() {
  return <div className="bg-[#3b82f6] h-[8px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container17() {
  return (
    <div className="basis-0 bg-[#e5e7eb] grow h-[8px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Container">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-0 pr-[65.281px] py-0 relative size-full">
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[32px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[14px]">32</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[136px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container17 />
        <Text6 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container18 />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[32px] relative shrink-0 w-[32.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[#0a0a0a] text-[24px]">😰</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#364153] text-[14px] text-nowrap">Anxious</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[32px] relative shrink-0 w-[92.094px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text7 />
        <Text8 />
      </div>
    </div>
  );
}

function Container21() {
  return <div className="bg-[#f59e0b] h-[8px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container22() {
  return (
    <div className="basis-0 bg-[#e5e7eb] grow h-[8px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Container">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-0 pr-[78.734px] py-0 relative size-full">
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[32px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[14px]">18</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[136px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container22 />
        <Text9 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container23 />
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[32px] relative shrink-0 w-[32.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[#0a0a0a] text-[24px]">😢</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#364153] text-[14px] text-nowrap">Upset</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[32px] relative shrink-0 w-[78.391px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text10 />
        <Text11 />
      </div>
    </div>
  );
}

function Container26() {
  return <div className="bg-[#dc2626] h-[8px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container27() {
  return (
    <div className="basis-0 bg-[#e5e7eb] grow h-[8px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Container">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-0 pr-[84.484px] py-0 relative size-full">
          <Container26 />
        </div>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[32px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[14px]">12</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[20px] relative shrink-0 w-[136px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container27 />
        <Text12 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container28 />
    </div>
  );
}

function App2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[164px] items-start relative shrink-0 w-full" data-name="App">
      <Container14 />
      <Container19 />
      <Container24 />
      <Container29 />
    </div>
  );
}

function Card2() {
  return (
    <div className="relative bg-white content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] rounded-[10px] w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Heading4 />
      <App2 />
    </div>
  );
}

function Container30() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#101828] text-[18px] text-nowrap top-0">{`Alerts & Notifications`}</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-1/2 right-1/2 top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5">
            <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[33.33%] left-1/2 right-[49.96%] top-[66.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.675 1.66667">
            <path d="M0.833333 0.833333H0.841667" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#ffe2e2] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[116.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#101828] text-[14px] text-nowrap">Missed Medication</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="basis-0 bg-[#ffe2e2] grow h-[22px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#ffc9c9] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[11px] py-[3px] relative size-full">
          <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#c10007] text-[12px] text-nowrap">3 missed MAR entries</p>
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 grow h-[22px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text13 />
        <Badge1 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[36px] relative shrink-0 w-[316.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container31 />
        <Container32 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[84.19px] size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[20px] relative shrink-0 w-[100.188px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[20px] left-[40.5px] text-[#155dfc] text-[14px] text-center text-nowrap top-[-1px] translate-x-[-50%]">View Details</p>
        <Icon4 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="[grid-area:1_/_1] bg-[#f9fafb] place-self-stretch relative rounded-[10px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[17px] py-px relative size-full">
          <Container33 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.44%_8.34%_12.5%_8.26%]" data-name="Vector">
        <div className="absolute inset-[-5.55%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3466 16.6783">
            <path d={svgPaths.p31b4080} id="Vector" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[45.83%] left-1/2 right-1/2 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5">
            <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-1/2 right-[49.96%] top-[70.83%]" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.675 1.66667">
            <path d="M0.833333 0.833333H0.841667" id="Vector" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-[#fef3c6] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#101828] text-[14px] top-[-1px] w-[84px]">Overdue Risk Assessments</p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#fef3c6] h-[38px] relative rounded-[3.35544e+07px] shrink-0 w-[135.719px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#fee685] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[11px] py-[3px] relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#bb4d00] text-[12px] text-nowrap">5 assessments expired</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text14 />
        <Badge2 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[40px] relative shrink-0 w-[354.031px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container35 />
        <Container36 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[79.42px] size-[15.047px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0469 15.0469">
        <g id="Icon">
          <path d={svgPaths.p2cec1240} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25391" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[40px] relative shrink-0 w-[94.469px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[20px] left-[38.09px] text-[#155dfc] text-[14px] text-center top-[-1px] translate-x-[-50%] w-[45px]">View Details</p>
        <Icon6 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="[grid-area:1_/_2] bg-[#f9fafb] place-self-stretch relative rounded-[10px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[17px] py-px relative size-full">
          <Container37 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-1/2 right-1/2 top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5">
            <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[33.33%] left-1/2 right-[49.96%] top-[66.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.675 1.66667">
            <path d="M0.833333 0.833333H0.841667" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[#ffe2e2] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[40px] relative shrink-0 w-[146.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#101828] text-[14px] top-[-1px] w-[102px]">High-Frequency Incidents</p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="basis-0 bg-[#ffe2e2] grow h-[38px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#ffc9c9] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[11px] py-[3px] relative size-full">
          <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#c10007] text-[12px] text-nowrap">Child X, 4 incidents in 24h</p>
        </div>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text15 />
        <Badge3 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[40px] relative shrink-0 w-[355.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container39 />
        <Container40 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[78.11px] size-[14.781px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.7812 14.7812">
        <g id="Icon">
          <path d={svgPaths.p21209280} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.23177" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[40px] relative shrink-0 w-[92.891px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[20px] left-[37.44px] text-[#155dfc] text-[14px] text-center top-[-1px] translate-x-[-50%] w-[45px]">View Details</p>
        <Icon8 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="[grid-area:2_/_1] bg-[#f9fafb] place-self-stretch relative rounded-[10px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[17px] py-px relative size-full">
          <Container41 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[33.33%] left-1/2 right-1/2 top-1/2" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5">
            <path d="M0.833333 4.16667V0.833333" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[66.67%] left-1/2 right-[49.96%] top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.675 1.66667">
            <path d="M0.833333 0.833333H0.841667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[40px] relative shrink-0 w-[116.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#101828] text-[14px] top-[-1px] w-[64px]">Upcoming Reviews</p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="basis-0 bg-[#dbeafe] grow h-[38px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[11px] py-[3px] relative size-full">
          <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#1447e6] text-[12px] text-nowrap">2 LAC reviews due this week</p>
        </div>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text16 />
        <Badge4 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[40px] relative shrink-0 w-[350.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container43 />
        <Container44 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[82.42px] size-[15.656px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6562 15.6562">
        <g id="Icon">
          <path d={svgPaths.p9360200} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.30469" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[40px] relative shrink-0 w-[98.078px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[20px] left-[39.59px] text-[#155dfc] text-[14px] text-center top-[-1px] translate-x-[-50%] w-[45px]">View Details</p>
        <Icon10 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="[grid-area:2_/_2] bg-[#f9fafb] place-self-stretch relative rounded-[10px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[17px] py-px relative size-full">
          <Container45 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function App3() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[164px] relative shrink-0 w-full" data-name="App">
      <Container34 />
      <Container38 />
      <Container42 />
      <Container46 />
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white h-[258px] relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Heading5 />
          <App3 />
        </div>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#101828] text-[18px] text-nowrap top-0">Upcoming Appointments</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_54.17%_83.33%_45.83%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.5 3">
            <path d="M0.75 0.75V2.25" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_79.17%_83.33%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.5 3">
            <path d="M0.75 0.75V2.25" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_41.67%_37.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
            <path d={svgPaths.p378e8100} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-[33.33%] right-[16.67%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 8.25">
            <path d={svgPaths.pf49de98} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-3/4 right-[8.33%] top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 4.5">
            <path d={svgPaths.p2c328e80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[10px] shrink-0 size-[34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#101828] text-[14px]">Sarah J.</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[12px]">Health Check</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[12px] top-0 w-[115px]">Mon 28 Nov at 09:00</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container48 />
        <Container49 />
        <Container50 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="bg-[#f9fafb] h-[82px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex gap-[12px] items-start pb-px pt-[13px] px-[13px] relative size-full">
          <Container47 />
          <Container51 />
        </div>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-1/2 right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.69%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.5 11.25">
            <path d="M0.75 10.5V0.75" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_37.5%_45.83%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-16.67%_-25.01%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00039 4.5002">
            <path d={svgPaths.p2ddadbc0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[72.92%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-22.22%_-8.33%_-22.23%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 4.87522">
            <path d={svgPaths.p21094d40} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[21.35%_12.5%_54.6%_74.99%]" data-name="Vector">
        <div className="absolute inset-[-17.34%_-33.29%_-17.33%_-33.3%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.75311 5.82783">
            <path d={svgPaths.p4665b50} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-3/4 right-[8.33%] top-[43.9%]" data-name="Vector">
        <div className="absolute inset-[-13.4%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49987 7.09812">
            <path d={svgPaths.p8a21e80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[72.85%_16.67%_8.35%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-22.16%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 4.88463">
            <path d={svgPaths.p8f91380} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[8.33%] right-3/4 top-[43.9%]" data-name="Vector">
        <div className="absolute inset-[-13.4%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49987 7.09812">
            <path d={svgPaths.peb32580} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[21.35%_74.99%_54.6%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-17.34%_-33.3%_-17.33%_-33.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.75311 5.82783">
            <path d={svgPaths.p18234100} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[10px] shrink-0 size-[34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#101828] text-[14px]">Michael T.</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[12px]">Therapy Session</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[12px] top-0 w-[115px]">Mon 28 Nov at 11:30</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container54 />
        <Container55 />
        <Container56 />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="bg-[#f9fafb] h-[82px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex gap-[12px] items-start pb-px pt-[13px] px-[13px] relative size-full">
          <Container53 />
          <Container57 />
        </div>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 16.5">
            <path d={svgPaths.pec82100} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p5d719a0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_37.5%_29.17%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 4.5">
            <path d={svgPaths.p8eaa5c0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[10px] shrink-0 size-[34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#101828] text-[14px]">Emma R.</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[12px]">Care Review</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[12px] top-0 w-[111px]">Tue 29 Nov at 14:00</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container60 />
        <Container61 />
        <Container62 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="bg-[#f9fafb] h-[82px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex gap-[12px] items-start pb-px pt-[13px] px-[13px] relative size-full">
          <Container59 />
          <Container63 />
        </div>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_54.17%_83.33%_45.83%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.5 3">
            <path d="M0.75 0.75V2.25" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_79.17%_83.33%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.5 3">
            <path d="M0.75 0.75V2.25" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_41.67%_37.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
            <path d={svgPaths.p378e8100} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-[33.33%] right-[16.67%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 8.25">
            <path d={svgPaths.pf49de98} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-3/4 right-[8.33%] top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 4.5">
            <path d={svgPaths.p2c328e80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[10px] shrink-0 size-[34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#101828] text-[14px]">Oliver P.</p>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[12px]">Health Check</p>
    </div>
  );
}

function Container68() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[12px] top-0 w-[117px]">Wed 30 Nov at 10:00</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container66 />
        <Container67 />
        <Container68 />
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="bg-[#f9fafb] h-[82px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex gap-[12px] items-start pb-px pt-[13px] px-[13px] relative size-full">
          <Container65 />
          <Container69 />
        </div>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-1/2 right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.69%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.5 11.25">
            <path d="M0.75 10.5V0.75" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_37.5%_45.83%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-16.67%_-25.01%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00039 4.5002">
            <path d={svgPaths.p2ddadbc0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[72.92%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-22.22%_-8.33%_-22.23%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 4.87522">
            <path d={svgPaths.p21094d40} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[21.35%_12.5%_54.6%_74.99%]" data-name="Vector">
        <div className="absolute inset-[-17.34%_-33.29%_-17.33%_-33.3%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.75311 5.82783">
            <path d={svgPaths.p4665b50} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-3/4 right-[8.33%] top-[43.9%]" data-name="Vector">
        <div className="absolute inset-[-13.4%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49987 7.09812">
            <path d={svgPaths.p8a21e80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[72.85%_16.67%_8.35%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-22.16%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 4.88463">
            <path d={svgPaths.p8f91380} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[8.33%] right-3/4 top-[43.9%]" data-name="Vector">
        <div className="absolute inset-[-13.4%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49987 7.09812">
            <path d={svgPaths.peb32580} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[21.35%_74.99%_54.6%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-17.34%_-33.3%_-17.33%_-33.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.75311 5.82783">
            <path d={svgPaths.p18234100} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[10px] shrink-0 size-[34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#101828] text-[14px]">Sophie M.</p>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[12px]">Therapy Session</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[12px] top-0 w-[104px]">Thu 1 Dec at 15:30</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container72 />
        <Container73 />
        <Container74 />
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="bg-[#f9fafb] h-[82px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex gap-[12px] items-start pb-px pt-[13px] px-[13px] relative size-full">
          <Container71 />
          <Container75 />
        </div>
      </div>
    </div>
  );
}

function App4() {
  return (
    <div className="h-[384px] relative shrink-0 w-full" data-name="App">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start pl-0 pr-[15px] py-0 relative size-full">
          <Container52 />
          <Container58 />
          <Container64 />
          <Container70 />
          <Container76 />
        </div>
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[10px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Heading6 />
          <App4 />
        </div>
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#101828] text-[18px] text-nowrap top-0">Recent Incidents</p>
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-[#ffe2e2] h-[22px] relative rounded-[3.35544e+07px] shrink-0 w-[47.766px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#ffc9c9] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[11px] py-[3px] relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#c10007] text-[12px] text-nowrap">High</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#101828] text-[14px]">Sarah J.</p>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">Physical Aggression</p>
    </div>
  );
}

function Container79() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container77 />
        <Container78 />
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[36px] relative shrink-0 w-[168.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Badge5 />
        <Container79 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#6a7282] text-[12px] text-right">2 hours ago</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Button">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#155dfc] text-[12px] text-center text-nowrap">View Report</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[40px] relative shrink-0 w-[67.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5px] items-start relative size-full">
        <Container81 />
        <Button4 />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="bg-[#f9fafb] h-[66px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <Container80 />
          <Container82 />
        </div>
      </div>
    </div>
  );
}

function Badge6() {
  return (
    <div className="bg-[#fef3c6] h-[22px] relative rounded-[3.35544e+07px] shrink-0 w-[65.438px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#fee685] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[11px] py-[3px] relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#bb4d00] text-[12px] text-nowrap">Medium</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#101828] text-[14px]">Michael T.</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">Property Damage</p>
    </div>
  );
}

function Container86() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container84 />
        <Container85 />
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="h-[36px] relative shrink-0 w-[172.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Badge6 />
        <Container86 />
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#6a7282] text-[12px] text-right">5 hours ago</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Button">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#155dfc] text-[12px] text-center text-nowrap">View Report</p>
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[40px] relative shrink-0 w-[67.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5px] items-start relative size-full">
        <Container88 />
        <Button5 />
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="bg-[#f9fafb] h-[66px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <Container87 />
          <Container89 />
        </div>
      </div>
    </div>
  );
}

function Badge7() {
  return (
    <div className="bg-[#dcfce7] h-[22px] relative rounded-[3.35544e+07px] shrink-0 w-[45.141px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#b9f8cf] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[11px] py-[3px] relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#008236] text-[12px] text-nowrap">Low</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#101828] text-[14px]">Emma R.</p>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">Minor Upset</p>
    </div>
  );
}

function Container93() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container91 />
        <Container92 />
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[36px] relative shrink-0 w-[123.156px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Badge7 />
        <Container93 />
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#6a7282] text-[12px] text-right">8 hours ago</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Button">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#155dfc] text-[12px] text-center text-nowrap">View Report</p>
    </div>
  );
}

function Container96() {
  return (
    <div className="h-[40px] relative shrink-0 w-[67.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5px] items-start relative size-full">
        <Container95 />
        <Button6 />
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="bg-[#f9fafb] h-[66px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <Container94 />
          <Container96 />
        </div>
      </div>
    </div>
  );
}

function Badge8() {
  return (
    <div className="bg-[#fef3c6] h-[22px] relative rounded-[3.35544e+07px] shrink-0 w-[65.438px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#fee685] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[11px] py-[3px] relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#bb4d00] text-[12px] text-nowrap">Medium</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#101828] text-[14px]">Oliver P.</p>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">Self-Harm Risk</p>
    </div>
  );
}

function Container100() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container98 />
        <Container99 />
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[36px] relative shrink-0 w-[159.391px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Badge8 />
        <Container100 />
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-0 w-[70.891px]" data-name="Container">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] text-nowrap text-right">12 hours ago</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[3.3px] top-[21px] w-[67.594px]" data-name="Button">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#155dfc] text-[12px] text-center text-nowrap">View Report</p>
    </div>
  );
}

function Container103() {
  return (
    <div className="h-[40px] relative shrink-0 w-[70.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container102 />
        <Button7 />
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="bg-[#f9fafb] h-[66px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <Container101 />
          <Container103 />
        </div>
      </div>
    </div>
  );
}

function App5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[288px] items-start relative shrink-0 w-full" data-name="App">
      <Container83 />
      <Container90 />
      <Container97 />
      <Container104 />
    </div>
  );
}

function Card5() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[10px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Heading7 />
          <App5 />
        </div>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="gap-[24px] grid grid-cols-1 lg:grid-cols-2 relative shrink-0 w-full" data-name="Container">
      <Card4 />
      <Card5 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#101828] text-[18px] text-nowrap top-0">Mood Trend Graph (7 Days)</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute inset-[2%_1.1%_14%_14.32%]" data-name="Group">
      <div className="absolute inset-[-0.24%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 384 211">
          <g id="Group">
            <path d="M0 210.5H384" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0 147.5H384" id="Vector_2" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0 84.5H384" id="Vector_3" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0 0.5H384" id="Vector_4" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute inset-[2%_1.1%_14%_14.32%]" data-name="Group">
      <div className="absolute inset-[0_-0.13%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 385 210">
          <g id="Group">
            <path d="M0.5 0V210" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M64.5 0V210" id="Vector_2" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M128.5 0V210" id="Vector_3" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M192.5 0V210" id="Vector_4" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M256.5 0V210" id="Vector_5" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M320.5 0V210" id="Vector_6" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M384.5 0V210" id="Vector_7" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[2%_1.1%_14%_14.32%]" data-name="Group">
      <Group13 />
      <Group14 />
    </div>
  );
}

function RechartsZindex100R() {
  return (
    <div className="absolute contents inset-[2%_1.1%_14%_14.32%]" data-name="recharts-zindex--100-:r42:">
      <Group15 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute inset-[17.96%_1.1%_62.72%_14.32%]" data-name="Group">
      <div className="absolute inset-[-3.11%_-0.06%_-3.11%_-0.13%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 384.708 51.3">
          <g id="Group">
            <path d={svgPaths.p6b6c110} id="recharts-line-:r44:" stroke="var(--stroke-0, #10B981)" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function RechartsZindex400R() {
  return (
    <div className="absolute contents inset-[17.96%_1.1%_62.72%_14.32%]" data-name="recharts-zindex-400-:r48:">
      <Group16 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute inset-[86%_85.68%_11.6%_14.32%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute inset-[86%_71.59%_11.6%_28.41%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute inset-[86%_57.49%_11.6%_42.51%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute inset-[86%_43.39%_11.6%_56.61%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute inset-[86%_29.3%_11.6%_70.7%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute inset-[86%_15.2%_11.6%_84.8%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute inset-[86%_1.1%_11.6%_98.9%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[86%_1.1%_11.6%_14.32%]" data-name="Group">
      <Group17 />
      <Group18 />
      <Group19 />
      <Group20 />
      <Group21 />
      <Group22 />
      <Group23 />
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-[86%_1.1%_11.6%_14.32%]" data-name="Group">
      <Group24 />
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[86%_1.1%_11.6%_14.32%]" data-name="Group">
      <div className="absolute inset-[86%_1.1%_14%_14.32%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 384 1">
            <path d="M0 0.5H384" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </svg>
        </div>
      </div>
      <Group25 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute inset-[86%_85.68%_14%_13%]" data-name="Group">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute inset-[60.8%_85.68%_39.2%_13%]" data-name="Group">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute inset-[35.6%_85.68%_64.4%_13%]" data-name="Group">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute inset-[2%_85.68%_98%_13%]" data-name="Group">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[2%_85.68%_14%_13%]" data-name="Group">
      <Group27 />
      <Group28 />
      <Group29 />
      <Group30 />
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents inset-[2%_85.68%_14%_13%]" data-name="Group">
      <Group31 />
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[2%_85.68%_14%_13%]" data-name="Group">
      <div className="absolute inset-[2%_85.68%_14%_14.32%]" data-name="Vector">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 210">
            <path d="M0.5 0V210" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </svg>
        </div>
      </div>
      <Group32 />
    </div>
  );
}

function RechartsZindex500R() {
  return (
    <div className="absolute contents inset-[2%_1.1%_11.6%_13%]" data-name="recharts-zindex-500-:r49:">
      <Group26 />
      <Group33 />
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute inset-[15.96%_0_60.72%_13.22%]" data-name="Group">
      <div className="absolute inset-[-2.57%_-0.38%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 397 61.3">
          <g id="Group">
            <path d={svgPaths.p34668280} fill="var(--fill-0, #10B981)" id="Vector" stroke="var(--stroke-0, #10B981)" strokeWidth="3" />
            <path d={svgPaths.p4da2000} fill="var(--fill-0, #10B981)" id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeWidth="3" />
            <path d={svgPaths.p9526700} fill="var(--fill-0, #10B981)" id="Vector_3" stroke="var(--stroke-0, #10B981)" strokeWidth="3" />
            <path d={svgPaths.p23a7bf00} fill="var(--fill-0, #10B981)" id="Vector_4" stroke="var(--stroke-0, #10B981)" strokeWidth="3" />
            <path d={svgPaths.p5729c80} fill="var(--fill-0, #10B981)" id="Vector_5" stroke="var(--stroke-0, #10B981)" strokeWidth="3" />
            <path d={svgPaths.p3ec60900} fill="var(--fill-0, #10B981)" id="Vector_6" stroke="var(--stroke-0, #10B981)" strokeWidth="3" />
            <path d={svgPaths.p32559080} fill="var(--fill-0, #10B981)" id="Vector_7" stroke="var(--stroke-0, #10B981)" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function RechartsZindex600R4A() {
  return (
    <div className="absolute contents inset-[15.96%_0_60.72%_13.22%]" data-name="recharts-zindex-600-:r4a:">
      <Group34 />
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[87.81%_82.93%_6.19%_11.56%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_82.93%_6.19%_11.56%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Mon</p>
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[87.81%_69.27%_6.19%_26.1%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_69.27%_6.19%_26.1%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Tue</p>
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents inset-[87.81%_54.63%_6.19%_39.65%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_54.63%_6.19%_39.65%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Wed</p>
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents inset-[87.81%_40.97%_6.19%_54.19%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_40.97%_6.19%_54.19%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Thu</p>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[87.81%_27.64%_6.19%_69.05%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_27.64%_6.19%_69.05%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Fri</p>
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents inset-[87.81%_13.11%_6.19%_82.71%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_13.11%_6.19%_82.71%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Sat</p>
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[87.81%_0.65%_6.19%_94.5%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_0.65%_6.19%_94.5%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Sun</p>
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute contents inset-[87.81%_0.65%_6.19%_11.56%]" data-name="Group">
      <Group35 />
      <Group36 />
      <Group37 />
      <Group38 />
      <Group39 />
      <Group40 />
      <Group41 />
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute contents inset-[82.9%_87.44%_11.1%_10.79%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[82.9%_87.44%_11.1%_10.79%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-nowrap text-right">0</p>
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute contents inset-[57.7%_87.44%_36.3%_10.79%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[57.7%_87.44%_36.3%_10.79%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-nowrap text-right">3</p>
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute contents inset-[32.5%_87.44%_61.5%_10.79%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[32.5%_87.44%_61.5%_10.79%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-nowrap text-right">6</p>
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute contents inset-[1.7%_87.44%_92.3%_9.47%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[1.7%_87.44%_92.3%_9.47%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-nowrap text-right">10</p>
    </div>
  );
}

function Group47() {
  return (
    <div className="absolute contents inset-[1.7%_87.44%_11.1%_9.47%]" data-name="Group">
      <Group43 />
      <Group44 />
      <Group45 />
      <Group46 />
    </div>
  );
}

function RechartsZindex2000R4E() {
  return (
    <div className="absolute contents inset-[1.7%_0.65%_6.19%_9.47%]" data-name="recharts-zindex-2000-:r4e:">
      <Group42 />
      <Group47 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute h-[250px] left-0 overflow-clip top-0 w-[454px]" data-name="Icon">
      <RechartsZindex100R />
      <RechartsZindex400R />
      <RechartsZindex500R />
      <RechartsZindex600R4A />
      <RechartsZindex2000R4E />
    </div>
  );
}

function Container106() {
  return (
    <div className="h-[250px] relative shrink-0 w-full" data-name="Container">
      <Icon16 />
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[135.39px] top-0 w-[40.766px]" data-name="Text">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#101828] text-[14px] text-nowrap">7.1/10</p>
    </div>
  );
}

function App6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="App">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#4a5565] text-[14px] text-nowrap top-[-1px]">Average mood score:</p>
      <Text17 />
    </div>
  );
}

function Card6() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[10px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Heading8 />
          <Container106 />
          <App6 />
        </div>
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#101828] text-[18px] text-nowrap top-0">Incidents This Week</p>
    </div>
  );
}

function Group48() {
  return (
    <div className="absolute inset-[2%_1.1%_14%_14.32%]" data-name="Group">
      <div className="absolute inset-[-0.24%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 384 211">
          <g id="Group">
            <path d="M0 210.5H384" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0 158H384" id="Vector_2" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0 105.5H384" id="Vector_3" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0 53H384" id="Vector_4" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0 0.5H384" id="Vector_5" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group49() {
  return (
    <div className="absolute inset-[2%_1.1%_14%_14.32%]" data-name="Group">
      <div className="absolute inset-[0_-0.13%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 385 210">
          <g id="Group">
            <path d="M27.9286 0V210" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M82.7857 0V210" id="Vector_2" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M137.643 0V210" id="Vector_3" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M192.5 0V210" id="Vector_4" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M247.357 0V210" id="Vector_5" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M302.214 0V210" id="Vector_6" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M357.071 0V210" id="Vector_7" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0.5 0V210" id="Vector_8" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M384.5 0V210" id="Vector_9" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group50() {
  return (
    <div className="absolute contents inset-[2%_1.1%_14%_14.32%]" data-name="Group">
      <Group48 />
      <Group49 />
    </div>
  );
}

function RechartsZindex100R4F() {
  return (
    <div className="absolute contents inset-[2%_1.1%_14%_14.32%]" data-name="recharts-zindex--100-:r4f:">
      <Group50 />
    </div>
  );
}

function Group51() {
  return (
    <div className="absolute bottom-[14%] left-[15.53%] right-3/4 top-[44%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 105">
        <g id="Group">
          <path d={svgPaths.p2264fa00} fill="var(--fill-0, #DC2626)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group52() {
  return (
    <div className="absolute inset-[65%_62.92%_14%_27.61%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 52.5">
        <g id="Group">
          <path d={svgPaths.p21202c00} fill="var(--fill-0, #DC2626)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group53() {
  return (
    <div className="absolute inset-[2%_50.84%_14%_39.69%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 210">
        <g id="Group">
          <path d={svgPaths.p3efea700} fill="var(--fill-0, #DC2626)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group54() {
  return (
    <div className="absolute inset-[65%_38.75%_14%_51.77%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 52.5">
        <g id="Group">
          <path d={svgPaths.pd27b900} fill="var(--fill-0, #DC2626)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group55() {
  return (
    <div className="absolute inset-[44%_26.67%_14%_63.86%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 105">
        <g id="Group">
          <path d={svgPaths.p2264fa00} fill="var(--fill-0, #DC2626)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group56() {
  return (
    <div className="absolute inset-[65%_14.59%_14%_75.94%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 52.5">
        <g id="Group">
          <path d={svgPaths.pd27b900} fill="var(--fill-0, #DC2626)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group57() {
  return (
    <div className="absolute inset-[65%_2.5%_14%_88.02%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 52.5">
        <g id="Group">
          <path d={svgPaths.pd27b900} fill="var(--fill-0, #DC2626)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group58() {
  return (
    <div className="absolute contents inset-[2%_2.51%_14%_15.53%]" data-name="Group">
      <Group51 />
      <Group52 />
      <Group53 />
      <Group54 />
      <Group55 />
      <Group56 />
      <Group57 />
    </div>
  );
}

function Group59() {
  return (
    <div className="absolute contents inset-[2%_2.51%_14%_15.53%]" data-name="Group">
      <Group58 />
    </div>
  );
}

function RechartsBarR4H() {
  return (
    <div className="absolute contents inset-[2%_2.51%_14%_15.53%]" data-name="recharts-bar-:r4h:">
      <Group59 />
    </div>
  );
}

function RechartsZindex300R4K() {
  return (
    <div className="absolute contents inset-[2%_2.51%_14%_15.53%]" data-name="recharts-zindex-300-:r4k:">
      <RechartsBarR4H />
    </div>
  );
}

function Group60() {
  return (
    <div className="absolute inset-[86%_79.64%_11.6%_20.36%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group61() {
  return (
    <div className="absolute inset-[86%_67.56%_11.6%_32.44%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group62() {
  return (
    <div className="absolute inset-[86%_55.48%_11.6%_44.52%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group63() {
  return (
    <div className="absolute inset-[86%_43.39%_11.6%_56.61%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group64() {
  return (
    <div className="absolute inset-[86%_31.31%_11.6%_68.69%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group65() {
  return (
    <div className="absolute inset-[86%_19.23%_11.6%_80.77%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group66() {
  return (
    <div className="absolute inset-[86%_7.14%_11.6%_92.86%]" data-name="Group">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group67() {
  return (
    <div className="absolute contents inset-[86%_7.14%_11.6%_20.36%]" data-name="Group">
      <Group60 />
      <Group61 />
      <Group62 />
      <Group63 />
      <Group64 />
      <Group65 />
      <Group66 />
    </div>
  );
}

function Group68() {
  return (
    <div className="absolute contents inset-[86%_7.14%_11.6%_20.36%]" data-name="Group">
      <Group67 />
    </div>
  );
}

function Group69() {
  return (
    <div className="absolute contents inset-[86%_1.1%_11.6%_14.32%]" data-name="Group">
      <div className="absolute inset-[86%_1.1%_14%_14.32%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 384 1">
            <path d="M0 0.5H384" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </svg>
        </div>
      </div>
      <Group68 />
    </div>
  );
}

function Group70() {
  return (
    <div className="absolute inset-[86%_85.68%_14%_13%]" data-name="Group">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group71() {
  return (
    <div className="absolute inset-[65%_85.68%_35%_13%]" data-name="Group">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group72() {
  return (
    <div className="absolute inset-[44%_85.68%_56%_13%]" data-name="Group">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group73() {
  return (
    <div className="absolute inset-[23%_85.68%_77%_13%]" data-name="Group">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group74() {
  return (
    <div className="absolute inset-[2%_85.68%_98%_13%]" data-name="Group">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group75() {
  return (
    <div className="absolute contents inset-[2%_85.68%_14%_13%]" data-name="Group">
      <Group70 />
      <Group71 />
      <Group72 />
      <Group73 />
      <Group74 />
    </div>
  );
}

function Group76() {
  return (
    <div className="absolute contents inset-[2%_85.68%_14%_13%]" data-name="Group">
      <Group75 />
    </div>
  );
}

function Group77() {
  return (
    <div className="absolute contents inset-[2%_85.68%_14%_13%]" data-name="Group">
      <div className="absolute inset-[2%_85.68%_14%_14.32%]" data-name="Vector">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 210">
            <path d="M0.5 0V210" id="Vector" stroke="var(--stroke-0, #6B7280)" />
          </svg>
        </div>
      </div>
      <Group76 />
    </div>
  );
}

function RechartsZindex500R4M() {
  return (
    <div className="absolute contents inset-[2%_1.1%_11.6%_13%]" data-name="recharts-zindex-500-:r4m:">
      <Group69 />
      <Group77 />
    </div>
  );
}

function Group78() {
  return (
    <div className="absolute contents inset-[87.81%_76.89%_6.19%_17.61%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_76.89%_6.19%_17.61%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Mon</p>
    </div>
  );
}

function Group79() {
  return (
    <div className="absolute contents inset-[87.81%_65.25%_6.19%_30.13%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_65.25%_6.19%_30.13%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Tue</p>
    </div>
  );
}

function Group80() {
  return (
    <div className="absolute contents inset-[87.81%_52.61%_6.19%_41.66%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_52.61%_6.19%_41.66%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Wed</p>
    </div>
  );
}

function Group81() {
  return (
    <div className="absolute contents inset-[87.81%_40.97%_6.19%_54.19%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_40.97%_6.19%_54.19%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Thu</p>
    </div>
  );
}

function Group82() {
  return (
    <div className="absolute contents inset-[87.81%_29.66%_6.19%_67.04%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_29.66%_6.19%_67.04%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Fri</p>
    </div>
  );
}

function Group83() {
  return (
    <div className="absolute contents inset-[87.81%_17.13%_6.19%_78.68%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_17.13%_6.19%_78.68%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Sat</p>
    </div>
  );
}

function Group84() {
  return (
    <div className="absolute contents inset-[87.81%_4.72%_6.19%_90.43%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_4.72%_6.19%_90.43%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-center text-nowrap">Sun</p>
    </div>
  );
}

function Group85() {
  return (
    <div className="absolute contents inset-[87.81%_4.72%_6.19%_17.61%]" data-name="Group">
      <Group78 />
      <Group79 />
      <Group80 />
      <Group81 />
      <Group82 />
      <Group83 />
      <Group84 />
    </div>
  );
}

function Group86() {
  return (
    <div className="absolute contents inset-[82.9%_87.44%_11.1%_10.79%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[82.9%_87.44%_11.1%_10.79%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-nowrap text-right">0</p>
    </div>
  );
}

function Group87() {
  return (
    <div className="absolute contents inset-[61.9%_87.44%_32.1%_11.23%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[61.9%_87.44%_32.1%_11.23%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-nowrap text-right">1</p>
    </div>
  );
}

function Group88() {
  return (
    <div className="absolute contents inset-[40.9%_87.44%_53.1%_10.79%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[40.9%_87.44%_53.1%_10.79%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-nowrap text-right">2</p>
    </div>
  );
}

function Group89() {
  return (
    <div className="absolute contents inset-[19.9%_87.44%_74.1%_10.79%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[19.9%_87.44%_74.1%_10.79%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-nowrap text-right">3</p>
    </div>
  );
}

function Group90() {
  return (
    <div className="absolute contents inset-[1.7%_87.44%_92.3%_10.79%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[1.7%_87.44%_92.3%_10.79%] leading-[normal] not-italic text-[#6b7280] text-[12px] text-nowrap text-right">4</p>
    </div>
  );
}

function Group91() {
  return (
    <div className="absolute contents inset-[1.7%_87.44%_11.1%_10.79%]" data-name="Group">
      <Group86 />
      <Group87 />
      <Group88 />
      <Group89 />
      <Group90 />
    </div>
  );
}

function RechartsZindex2000R4R() {
  return (
    <div className="absolute contents inset-[1.7%_4.72%_6.19%_10.79%]" data-name="recharts-zindex-2000-:r4r:">
      <Group85 />
      <Group91 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute h-[250px] left-0 overflow-clip top-0 w-[454px]" data-name="Icon">
      <RechartsZindex100R4F />
      <RechartsZindex300R4K />
      <RechartsZindex500R4M />
      <RechartsZindex2000R4R />
    </div>
  );
}

function Container107() {
  return (
    <div className="h-[250px] relative shrink-0 w-full" data-name="Container">
      <Icon17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[98.09px] top-0 w-[16.813px]" data-name="Text">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#101828] text-[14px] text-nowrap">12</p>
    </div>
  );
}

function App7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="App">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#4a5565] text-[14px] text-nowrap top-[-1px]">Total incidents:</p>
      <Text18 />
    </div>
  );
}

function Card7() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[10px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Heading9 />
          <Container107 />
          <App7 />
        </div>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="gap-[24px] grid grid-cols-1 lg:grid-cols-2 relative shrink-0 w-full" data-name="Container">
      <Card6 />
      <Card7 />
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex h-[65px] items-start pb-[24px] pt-[25px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function App8() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start w-full" data-name="App">
      <Container />
      <Container30 />
      <Card3 />
      <Container105 />
      <Container108 />
      <Container109 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="basis-0 font-['Nunito:Bold',sans-serif] font-bold grow leading-[28px] min-h-px min-w-px relative shrink-0 text-[20px] text-white">MpoweredCare</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#99a1af] text-[14px]">Care Management</p>
    </div>
  );
}

function Container110() {
  return (
    <div className="h-[101px] relative shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#364153] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-px pt-[24px] px-[24px] relative size-full">
        <Heading1 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1fc96a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p33089d00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p49cfa80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1cfbf300} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[68.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white">Dashboard</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#155dfc] h-[44px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#51a2ff] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[28px] pr-0 py-0 relative size-full">
          <Icon18 />
          <Text19 />
        </div>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p166b7100} id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[85.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px] text-center text-nowrap">Service Users</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[24px] pr-0 py-0 relative size-full">
          <Icon19 />
          <Text20 />
        </div>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p31104300} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1b3f8200} id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 9.16667H13.3333" id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 13.3333H13.3333" id="Vector_4" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 9.16667H6.675" id="Vector_5" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 13.3333H6.675" id="Vector_6" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[20px] relative shrink-0 w-[66.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px] text-center text-nowrap">Daily Logs</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[24px] pr-0 py-0 relative size-full">
          <Icon20 />
          <Text21 />
        </div>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p232b1d80} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3abdf300} id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 7.5H6.66667" id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 10.8333H6.66667" id="Vector_4" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 14.1667H6.66667" id="Vector_5" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px] text-center text-nowrap">Care Plans</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[24px] pr-0 py-0 relative size-full">
          <Icon21 />
          <Text22 />
        </div>
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_88_808)" id="Icon">
          <path d={svgPaths.p12d37920} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p29fbf480} id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_88_808">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[68.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px] text-center text-nowrap">Medication</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[24px] pr-0 py-0 relative size-full">
          <Icon22 />
          <Text23 />
        </div>
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px] text-center text-nowrap">Scheduling</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[24px] pr-0 py-0 relative size-full">
          <Icon23 />
          <Text24 />
        </div>
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_88_649)" id="Icon">
          <path d={svgPaths.p363df2c0} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_88_649">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[20px] relative shrink-0 w-[57.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px] text-center text-nowrap">Activities</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[24px] pr-0 py-0 relative size-full">
          <Icon24 />
          <Text25 />
        </div>
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_88_644)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V10" id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 13.3333H10.0083" id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_88_644">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[20px] relative shrink-0 w-[56.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px] text-center text-nowrap">Incidents</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[24px] pr-0 py-0 relative size-full">
          <Icon25 />
          <Text26 />
        </div>
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25fc4100} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[20px] relative shrink-0 w-[73.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px] text-center text-nowrap">Compliance</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[24px] pr-0 py-0 relative size-full">
          <Icon26 />
          <Text27 />
        </div>
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1f20b6c0} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[20px] relative shrink-0 w-[51.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#d1d5dc] text-[14px] text-center text-nowrap">Settings</p>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[24px] pr-0 py-0 relative size-full">
          <Icon27 />
          <Text28 />
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[256px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[24px] px-0 relative size-full">
        <Button8 />
        <Button9 />
        <Button10 />
        <Button11 />
        <Button12 />
        <Button13 />
        <Button14 />
        <Button15 />
        <Button16 />
        <Button17 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#1e2939] content-stretch flex flex-col h-[1731px] items-start left-0 pb-[-31px] pt-0 px-0 top-0 w-[256px]" data-name="Sidebar">
      <Container110 />
      <Navigation />
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute h-[24px] left-0 top-[-20000px] w-[9.609px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#0a0a0a] text-[16px] text-nowrap top-0">1</p>
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M17.5 17.5L13.8833 13.8833" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pcddfd00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-nowrap">Search service users...</p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex gap-[12px] h-[38px] items-center left-[32px] px-[17px] py-px rounded-[10px] top-[12.5px] w-[682.875px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon28 />
      <TextInput />
    </div>
  );
}

function Container112() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[738.88px] top-[21.5px] w-[192.125px]" data-name="Container">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Wednesday 3 December 2025</p>
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container113() {
  return (
    <div className="basis-0 bg-[#155dfc] grow h-[32px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon29 />
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="absolute content-stretch flex items-center left-[1015px] px-[8px] py-0 rounded-[10px] size-[48px] top-[7.5px]" data-name="Button">
      <Container113 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute left-[8px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1c3efea0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25877f40} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text30() {
  return <div className="absolute bg-[#fb2c36] left-[24px] rounded-[3.35544e+07px] size-[8px] top-[4px]" data-name="Text" />;
}

function Button19() {
  return (
    <div className="absolute left-[955px] rounded-[10px] size-[36px] top-[13.5px]" data-name="Button">
      <Icon30 />
      <Text30 />
    </div>
  );
}

function TopBar() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0px_0px_1px] border-solid h-[64px] left-[256px] top-0 w-[1095px]" data-name="TopBar">
      <Container111 />
      <Container112 />
      <Button18 />
      <Button19 />
    </div>
  );
}

export default function CareManagementPlatform() {
  return (
    <div className="relative w-full" data-name="Care Management Platform">
      <App8 />
    </div>
  );
}