import { render, screen } from "@testing-library/react";
import { notDeepEqual } from "assert";
import { updateNamespaceExportDeclaration } from "typescript";
import Pagination from '..';

describe('Pagination testes', () => {

  test('should render Pagination', () => {

    const pageCount = 3;
    const range = 3;

    render(
      <Pagination
      pageCount={pageCount}
      range={range}
      />
    );

    const page1 = screen.getByText('1')
    const page2 = screen.getByText('2')
    const page3 = screen.getByText('3')
    const page4 = screen.getByText('4')


    expect(page1).toBeInTheDocument();
    expect(page1).toHaveClass('pagination-link-active')

    expect(page2).toBeInTheDocument();
    expect(page1).not.toHaveClass('pagination-link-active')

    expect(page3).toBeInTheDocument();
    expect(page1).not.toHaveClass('pagination-link-active')

    expect(page4).not.toBeInTheDocument();
  })

});
