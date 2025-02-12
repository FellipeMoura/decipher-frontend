import { Icon, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IListItemLinkProps {
  to?: string;
  icon: string;
  label: string;
  onClick?: (() => void);
  isDrawerExpanded?: boolean;
  isChecked?: boolean;
}

export const ListItemLink: React.FC<IListItemLinkProps> = ({ isChecked = true, isDrawerExpanded = true, to, icon, label, onClick }) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to || '/');
  const match = useMatch({ path: resolvedPath.pathname, end: true });

  const handleClick = () => {
    !!to && navigate(to);
    onClick?.();
  };

  return (
    !!isChecked &&
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon sx={{ minWidth: '30px', mr: isDrawerExpanded ? 1 : 'auto' }}>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} sx={{ visibility: isDrawerExpanded ? 'visible' : 'hidden' }} /> {/* Esconde o texto */}
    </ListItemButton>

  );
};

interface IListItemLinkToolTipProps {
  to?: string;
  icon: string;
  label: string;
  onClick?: (() => void) | undefined;
  isDrawerExpanded?: boolean;
  title?: any;
}

export const ListItemLinkToolTip: React.FC<IListItemLinkToolTipProps> = ({ title = false, isDrawerExpanded = true, to, icon, label, onClick }) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to || '/');
  const match = useMatch({ path: resolvedPath.pathname, end: true });

  const handleClick = () => {
    !!to && navigate(to);
    onClick?.();
  };

  return (
    <Tooltip title={!isDrawerExpanded ? label : title || ''} placement="right" arrow>

      <ListItemButton selected={!!match} onClick={handleClick}>
        <ListItemIcon sx={{ minWidth: '30px', mr: isDrawerExpanded ? 1 : 'auto' }}>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={label} sx={{ visibility: isDrawerExpanded ? 'visible' : 'hidden' }} /> {/* Esconde o texto */}
      </ListItemButton>
    </Tooltip >
  );
};