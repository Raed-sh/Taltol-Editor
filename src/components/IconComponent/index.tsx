import { FC } from "react";
import { CARDTOOLS, TOOLS } from "../../utils/constants";

export const IconComponent: FC<any> = ({ ...props }): any => {
  var SelectIcon: any = TOOLS.filter(({ title }) => title === props.title).map(
    (icon) => icon.icon
  );
  SelectIcon = SelectIcon[0];
  return <SelectIcon {...props} />;
};

export const CardIconComponent: FC<any> = ({ ...props }): any => {
  var SelectIcon: any = CARDTOOLS.filter(
    ({ title }) => title === props.title
  ).map((icon) => icon.icon);
  SelectIcon = SelectIcon[0];
  return <SelectIcon {...props} />;
};
