import React, {useContext} from 'react';
import { Link } from "react-router-dom";

export interface EmptyStateProps {
  /** The empty state heading */
  heading?: string;
  /** The path to the image to display */
  image: string;
  /** The path to the image to display on large screens */
  largeImage?: string;
  /**
   * Whether or not to limit the image to the size of its container on large screens.
   */
  imageContained?: boolean;
  /** Elements to display inside empty state */
  children?: React.ReactNode;
  /** Primary action for empty state */
  action?: Action;
  /** Secondary action for empty state */
  secondaryAction?: Action;

  internAction?: Action;
  /** Secondary elements to display below empty state actions */
  footerContent?: React.ReactNode;
}

export function EmptyState({
  children,
  heading,
  image,
  largeImage,
  imageContained,
  action,
  secondaryAction,
  internAction,
  footerContent,
}: EmptyStateProps) {



  const imageMarkup = largeImage ? (
    <img
      alt=""
      role="presentation"
      className=""
      src={largeImage}
      sourceSet="60vw"
      sizes="(max-width: 568px) 60vw"
    />
  ) : (
    <img role="presentation" alt="" className="" src={image} />
  );

  const secondaryActionMarkup = secondaryAction
    ? <a href={secondaryAction.url} target="_blank" className="btn btn-dark">{secondaryAction.content}</a>
    : null;

  const internActionMarkup = internAction
    ? <Link to={internAction.url} className="btn btn-dark">{internAction.content}</Link>
    : null;

  const footerContentMarkup = footerContent ? (
    <div className="">
      <p>{footerContent}</p>
    </div>
  ) : null;

  const headingSize = 'small';
  const primaryActionSize = 'small';

    const primaryActionMarkup = action ? (
      <button className="btn btn-sm btn-primary">{action.content}</button>
    ) : null;

  const headingMarkup = heading ? (
    <h3>{heading}</h3>
  ) : null;

  const childrenMarkup = children ? (
    <div className="">{children}</div>
  ) : null;

  const textContentMarkup =
    headingMarkup || children ? (
      <div className="text-center">
        {headingMarkup}
        {childrenMarkup}
      </div>
    ) : null;

  const actionsMarkup =
    primaryActionMarkup || secondaryActionMarkup || internActionMarkup ? (
      <div className="empty-section__cta mt-2 text-center">
          {primaryActionMarkup}
          {secondaryActionMarkup}
          {internActionMarkup}
      </div>
    ) : null;

  const detailsMarkup =
    textContentMarkup || actionsMarkup || footerContentMarkup ? (
      <div className="empty-section my-2">
          {textContentMarkup}
          {actionsMarkup}
          {footerContentMarkup}
      </div>
    ) : (
      null
    );

  return (
      <div className="empty-section__content">
        {detailsMarkup}
        <div className="empty-section__img">{imageMarkup}</div>
      </div>
  );
}
