function PrimitiveH() {
  return (
    <div className="h-[15.75px] relative shrink-0 w-[404px]" data-name="Primitive.h2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[15.75px] left-0 text-[#0a0a0a] text-[15.75px] top-[-2px] whitespace-nowrap">Add New Compliance Document</p>
      </div>
    </div>
  );
}

function PrimitiveP() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[404px]" data-name="Primitive.p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[17.5px] min-h-px min-w-px relative text-[#717182] text-[12.25px]">Add a new policy, procedure, or compliance document to the system.</p>
      </div>
    </div>
  );
}

function DialogHeader() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7px] h-[40.25px] items-start left-[21px] top-[21px] w-[404px]" data-name="DialogHeader">
      <PrimitiveH />
      <PrimitiveP />
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[12.25px] relative shrink-0 text-[#0a0a0a] text-[12.25px] whitespace-nowrap">Document Title *</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f3f3f5] h-[31.5px] relative rounded-[6.75px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10.5px] py-[3.5px] relative size-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#717182] text-[12.25px] whitespace-nowrap">e.g., GDPR Data Protection Policy</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[7px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <PrimitiveLabel />
      <Input />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[12.25px] relative shrink-0 text-[#0a0a0a] text-[12.25px] whitespace-nowrap">Document Type *</p>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[59.141px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[17.5px] relative shrink-0 text-[#717182] text-[12.25px] text-center whitespace-nowrap">Select type</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.5">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="bg-[#f3f3f5] h-[31.5px] relative rounded-[6.75px] shrink-0 w-full" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[11.5px] py-px relative size-full">
          <PrimitiveSpan />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[7px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <PrimitiveLabel1 />
      <PrimitiveButton />
    </div>
  );
}

function Container() {
  return (
    <div className="gap-x-[14px] gap-y-[14px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[57.75px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[12.25px] relative shrink-0 text-[#0a0a0a] text-[12.25px] whitespace-nowrap">Category *</p>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[82.484px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[17.5px] relative shrink-0 text-[#717182] text-[12.25px] text-center whitespace-nowrap">Select category</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon" opacity="0.5">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="bg-[#f3f3f5] h-[31.5px] relative rounded-[6.75px] shrink-0 w-full" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[11.5px] py-px relative size-full">
          <PrimitiveSpan1 />
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[7px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <PrimitiveLabel2 />
      <PrimitiveButton1 />
    </div>
  );
}

function PrimitiveLabel3() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[12.25px] relative shrink-0 text-[#0a0a0a] text-[12.25px] whitespace-nowrap">Document Owner *</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f3f3f5] h-[31.5px] relative rounded-[6.75px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10.5px] py-[3.5px] relative size-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#717182] text-[12.25px] whitespace-nowrap">Responsible person</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[7px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <PrimitiveLabel3 />
      <Input1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="gap-x-[14px] gap-y-[14px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[57.75px] relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function PrimitiveLabel4() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[12.25px] relative shrink-0 text-[#0a0a0a] text-[12.25px] whitespace-nowrap">Next Review Date *</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#f3f3f5] h-[31.5px] relative rounded-[6.75px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[7px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <PrimitiveLabel4 />
      <Input2 />
    </div>
  );
}

function PrimitiveLabel5() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[12.25px] relative shrink-0 text-[#0a0a0a] text-[12.25px] whitespace-nowrap">Tags (comma-separated)</p>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f3f3f5] h-[31.5px] relative rounded-[6.75px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10.5px] py-[3.5px] relative size-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#717182] text-[12.25px] whitespace-nowrap">e.g., GDPR, Privacy, Data</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[7px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <PrimitiveLabel5 />
      <Input3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="gap-x-[14px] gap-y-[14px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[50.75px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function PrimitiveLabel6() {
  return (
    <div className="content-stretch flex h-[12.25px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[12.25px] relative shrink-0 text-[#0a0a0a] text-[12.25px] whitespace-nowrap">Upload Document</p>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#f3f3f5] h-[31.5px] relative rounded-[6.75px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] h-[50.75px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel6 />
      <Input4 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[31.5px] relative rounded-[6.75px] shrink-0 w-[66.625px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[15px] py-[8px] relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[17.5px] relative shrink-0 text-[#0a0a0a] text-[12.25px] text-center whitespace-nowrap">Cancel</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#276647] h-[31.5px] relative rounded-[6.75px] shrink-0 w-[112.297px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[14px] py-[7px] relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[17.5px] relative shrink-0 text-[12.25px] text-center text-white whitespace-nowrap">Add Document</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[7px] h-[45.5px] items-start justify-end pt-[14px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function ComplianceManagement() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] h-[318.5px] items-start left-[21px] top-[75.25px] w-[404px]" data-name="ComplianceManagement">
      <Container />
      <Container3 />
      <Container6 />
      <Container9 />
      <Container10 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[14px] top-0" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M10.5 3.5L3.5 10.5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M3.5 3.5L10.5 10.5" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function DialogContent() {
  return (
    <div className="absolute left-[6px] overflow-clip size-px top-[13px]" data-name="DialogContent">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[17px] text-[#0a0a0a] text-[14px] text-center top-[-1px] whitespace-nowrap">Close</p>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="absolute left-[418px] opacity-70 rounded-[1.75px] size-[14px] top-[14px]" data-name="Primitive.button">
      <Icon2 />
      <DialogContent />
    </div>
  );
}

export default function PrimitiveDiv() {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid overflow-clip relative rounded-[8.75px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-full" data-name="Primitive.div">
      <DialogHeader />
      <ComplianceManagement />
      <PrimitiveButton2 />
    </div>
  );
}